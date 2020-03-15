import { TTYElement } from "../TTYElement";

export class TTYLIElement extends TTYElement{

    get value():number{
        let value = parseInt(this.getAttribute('value') as string);
        if(!isNaN(value)){
            return value;
        }
        let siblingList:TTYLIElement[]|undefined = this.parent?.childElements.filter(function(elem):elem is TTYLIElement{
            return elem instanceof TTYLIElement;
        });
        let index = 0;
        if(siblingList){
            for(let elem of siblingList){
                let elemValue = parseInt(elem.getAttribute('value') as string);
                if(!isNaN(elemValue)){
                    index = elemValue;
                }else{
                    index++;
                }
                if(elem===this){
                    return index;
                }
            }
        }else{
            index = 1;
        }
        return index as number;
    }

    set value(value:number){
        this.setAttribute('value',value.toString());
    }
}