import { TTYNode } from "./TTYNode";
import { TTYElement } from "./TTYElement";
import { TTYElementsCollection, TTYElementConstructors } from "../../declarations/dom/TTYElementsCollection";
import { RenderedTree } from "../render/RenderedNode";
import { optional } from "../../utils/optional";

export class TTYDocument extends TTYNode{

    constructor(root?:TTYElement){
        super();
        if(root){
            this.setRoot(root);
        }
    }

    _ownerDocument = this;
    
    setRoot(root:TTYElement){
        this.root = root;
        root._ownerDocument = this;
    }

    createElement<K extends keyof TTYElementsCollection>(tagName:K):TTYElementsCollection[K];
    createElement(tagName:string):TTYElement;
    createElement(tagName:string){
        if(tagName in TTYElementConstructors){
            return new ((TTYElementConstructors as any)[tagName])(tagName) as any;
        }else{
            return new TTYElement(tagName);
        }
    }

    root:TTYElement|null = null;

    _renderedTree?:RenderedTree;
}