import { TTYNode } from "./TTYNode";
import { Constants } from "./constants";
import { TTYElementsCollection } from "../../declarations/dom/TTYElementsCollection";
import { TTYTextNode } from "./TTYTextNode";
import { querySelector, querySelectorAll } from "../../utils/selectorUtils";
import { RenderedTree, RenderedNode } from "../render/RenderedNode";

export class TTYElement extends TTYNode{

    constructor(tagName:string){
        super();
        this._tagName = tagName;
    }

    protected _parent:TTYElement|null = null;
    get parent(){
        return this._parent;
    }

    protected _tagName:string;
    get tagName(){
        return this._tagName;
    }

    protected _attributes:Map<string,string> = new Map();
    get attributes():readonly [string,string][]{
        return [...this._attributes];
    }

    get childElements():readonly TTYElement[]{
        return this.childNodes.filter(function(node):node is TTYElement{
            return node instanceof TTYElement;
        });
    }
    
    get id(){
        return this.getAttribute('id');
    }
    set id(id:string|null){
        if(id===null){
            this.removeAttribute('id');
        }else{
            this.setAttribute('id',id);
        }
    }

    get className(){
        return this.getAttribute('class');
    }
    set className(className:string|null){
        if(className===null){
            this.removeAttribute('class');
        }else{
            this.setAttribute('class',className);
        }
    }

    get classList(){
        let s = this.className;
        if(!s)return [];
        return s.split(/\s+/);
    }
    set classList(classList:string[]){
        this.className = classList.join(' ');
    }
    
    get previousElementSibling(){
        let node;
        do{
            node = this.previousSibling;
        }while(!(!node || node instanceof TTYElement));
        return node;
    }

    get nextElementSibling(){
        let node;
        do{
            node = this.nextSibling;
        }while(!(!node || node instanceof TTYElement));
        return node;
    }

    setAttribute(key:string,value:string){
        let oldVal;
        if(this._attributes.has(key)){
            oldVal = this._attributes.get(key)!
        }else{
            oldVal = null;
        }
        this._attributes.set(key,value);
        this.emit(Constants.Element.Event.ATTR_CHANGED,key,oldVal,value);
    }

    getAttribute(key:string){
        if(this._attributes.has(key)){
            return this._attributes.get(key)!;
        }else{
            return null;
        }
    }

    removeAttribute(key:string){
        let oldVal = this.getAttribute(key);
        this._attributes.delete(key);
        this.emit(Constants.Element.Event.ATTR_CHANGED,key,oldVal,null);
    }

    getElementById(id:string):TTYElement|null{
        let result=null;
        this._bfs((elem)=>{
            if(elem instanceof TTYElement && elem.id === id){
                result = elem;
                return Constants.Node.BREAK_ITERATION;
            }
        });
        return result;
    }

    getElementsByClassName(classNames:string):TTYElement[]{
        let res:TTYElement[] = [];
        let classList = classNames.split(/\s+/);
        this._bfs((elem)=>{
            if(elem instanceof TTYElement){
                for(let className of classList){
                    if(className in elem.classList){
                        res.push(elem);
                    }
                }
            }
        });
        return res;
    }

    getElementsByTagName<K extends keyof TTYElementsCollection>(tagName:K):TTYElementsCollection[K][];
    getElementsByTagName(tagName:string):TTYElement[];
    getElementsByTagName(tagName:string):TTYElement[]{
        let res:TTYElement[] = [];
        this._bfs((elem)=>{
            if(elem instanceof TTYElement && elem.tagName === tagName){
                res.push(elem);
            }
        });
        return res;
    }

    querySelector<K extends keyof TTYElementsCollection>(selector:K):TTYElementsCollection[K]|null;
    querySelector(selector:string):TTYElement|null;
    querySelector(selector:string):TTYElement|null{
        return querySelector(this,selector);
    }

    querySelectorAll<K extends keyof TTYElementsCollection>(selector:K):TTYElementsCollection[K][];
    querySelectorAll(selector:string):TTYElement[];
    querySelectorAll(selector:string):TTYElement[]{
        return querySelectorAll(this,selector);
    }

    get textContent(){
        let text = '';
        for(let node of this.childNodes){
            if(node instanceof TTYTextNode){
                text+=node.text;
            }else if(node instanceof TTYElement){
                text+=node.textContent;
            }
        }
        return text;
    }

    set textContent(text:string){
        for(let node of this.childNodes){
            (node as any)._remove();
        }
        let textNode = new TTYTextNode(text);
        this.appendChild(textNode);
    }

    _renderedNode?:RenderedNode;
}