import { TTYNode } from "./TTYNode";

export class TTYTextNode extends TTYNode{
    constructor(text:string){
        super();
        this.text = text;
    }
    text:string = '';
}