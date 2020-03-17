import { TTYDocument } from "../dom/TTYDocument";
import { Constants } from "../dom/constants";

export class RenderedTree{
    constructor(document:TTYDocument){
        this.document = document;
        document._renderedTree = this;
    }

   protected  _setEventListener(){
       this.document.on(Constants.Element.Event.REFLOW,()=>{
            
       });
   }

    document:TTYDocument;
}

export class RenderedNode{

}