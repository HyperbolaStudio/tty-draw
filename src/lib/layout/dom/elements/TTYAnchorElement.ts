import { TTYElement } from "../TTYElement";

export class TTYAnchorElement extends TTYElement{
    get href(){
        return this.getAttribute('href');
    }
    set href(href:string|null){
        if(href===null){
            this.removeAttribute('href');
        }else{
            this.setAttribute('href',href);
        }
    }
    get target(){
        return this.getAttribute('target');
    }
    set target(target:string|null){
        if(target===null){
            this.removeAttribute('target');
        }else{
            this.setAttribute('target',target);
        }
    }
}