import { EventEmitter } from 'events';
import { TTYDocument } from './TTYDocument';
import Yallist from 'yallist';
import { Constants } from './constants';
import { insertNodeBefore } from '../../utils/insertNodeBefore';

export class TTYNode extends EventEmitter{

    protected _parent:TTYNode|null|undefined = null;
    get parent(){
        return this._parent;
    }

    protected _children:Yallist<TTYNode> = Yallist.create();
    get childNodes():readonly TTYNode[]{
        return this._children.toArray();
    }

    protected _lListNode:Yallist.Node<TTYNode>|null = null;
    get previousSibling(){
        return this._lListNode?.prev?.value;
    }

    get nextSibling(){
        return this._lListNode?.next?.value;
    }

    _ownerDocument:TTYDocument|null|undefined = null;
    get ownerDocument(){
        return this._ownerDocument;
    }

    protected _isConnected:boolean = false;
    get isConnected(){
        return this._isConnected;
    }


    protected _connect(parent:TTYNode,lListNode:Yallist.Node<TTYNode>){
        this._isConnected = true;
        this._parent = parent;
        this._lListNode = lListNode;
        this._ownerDocument = parent.ownerDocument;
    }

    protected _remove(){
        this._lListNode?.list?.removeNode(this._lListNode);
        this._isConnected = false;
        this._parent = null;
        this._ownerDocument = null;
    }

    prependChild(...elements:TTYNode[]){
        for(let element of elements){
            element._remove();
            this._children.unshift(element);
            element._connect(this,this._children.head!);
            element.emit(Constants.Node.Event.CONNECTED);
        }
        this.ownerDocument?.emit(Constants.Element.Event.REFLOW);
    }

    appendChild(...elements:TTYNode[]){
        for(let element of elements){
            element._remove();
            this._children.push(element);
            element._connect(this,this._children.tail!);
            element.emit(Constants.Node.Event.CONNECTED);
        }
        this.ownerDocument?.emit(Constants.Element.Event.REFLOW);
    }

    insertBefore(newNode:TTYNode,targetNode?:TTYNode){
        newNode._remove();
        newNode._connect(this,insertNodeBefore(newNode,this._children,targetNode?._lListNode));
        newNode.emit(Constants.Element.Event.REFLOW);
    }

    remove(){
        if(!this._parent)return;
        let tmp_parent = this._parent;
        this._remove()
        tmp_parent.ownerDocument?.emit(Constants.Element.Event.REFLOW);
    }

    replaceWith(node:TTYNode){
        if(!this.isConnected)return;
        node._remove();
        let parent = this._parent!;
        let lListNode = this._lListNode!;
        this._isConnected = false;
        this._parent = null;
        this._ownerDocument = null;
        lListNode.value = node;
        node._connect(parent,lListNode);
        parent.ownerDocument?.emit(Constants.Element.Event.REFLOW);
    }

    protected _bfs(cb:(elem:TTYNode)=>void|typeof Constants.Node.BREAK_ITERATION){
        let queue:TTYNode[] = [...this.childNodes];
        while(queue.length){
            let elem = queue.shift()!;
            if(cb(elem)===Constants.Node.BREAK_ITERATION){
                return;
            }
            queue.push(...elem.childNodes);
        }
    }
}