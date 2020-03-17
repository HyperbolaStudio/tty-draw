import { Adapter, selectOne, selectAll } from "css-select";
import { TTYNode } from "../layout/dom/TTYNode";
import { TTYElement } from "../layout/dom/TTYElement";

export const adapter:Adapter<TTYNode,TTYElement> = {
    isTag(node):node is TTYElement{
        return node instanceof TTYElement;
    },
    getChildren(node){
        return node.childNodes as TTYNode[];
    },
    getName(elem){
        return elem.tagName;
    },
    getAttributeValue(elem,attr){
        return elem.getAttribute(attr) as string;
    },
    getParent(node){
        return node.parent as TTYNode;
    },
    getSiblings(node){
        return (node.parent?node.parent.childNodes:[]) as TTYNode[];
    },
    findAll(test,nodes){
        const result: TTYElement[] = [];
        const stack = [...nodes]
        while(stack.length){
            const elem = stack.pop();
            if (elem instanceof TTYElement){
                if (elem.childElements.length > 0) {
                    stack.push(...elem.childElements);
                }
                if (test(elem)) result.push(elem);
            }
        }
        return result;
    },
    findOne(test,elems){
        const stack = [...elems]
        while(stack.length){
            const elem = stack.pop();
            if (elem instanceof TTYElement){
                if (elem.childElements.length > 0) {
                    stack.push(...elem.childElements);
                }
                if (test(elem)) return elem;
            }
        }
        return undefined;
    },
    existsOne(test,elems){
        return !!this.findOne(test,elems);
    },
    getText(node){
        if(node instanceof TTYElement){
            return node.textContent;
        }
        return '';
    },
    hasAttrib(elem,name){
        return !!elem.getAttribute(name);
    },
    //not knowing what this fucking method is, just copy from domutils
    //(their apis look like the same)
    removeSubsets(nodes){
        let idx = nodes.length;
        while (--idx >= 0) {
            const node = nodes[idx];
            if (idx > 0 && nodes.lastIndexOf(node, idx - 1) >= 0) {
                nodes.splice(idx, 1);
                continue;
            }
    
            for (let ancestor = node.parent; ancestor; ancestor = ancestor.parent) {
                if (nodes.indexOf(ancestor) > -1) {
                    nodes.splice(idx, 1);
                    break;
                }
            }
        }
    
        return nodes;
    }
}

export function querySelector(element:TTYElement,selector:string){
    return selectOne(selector,element,{adapter});
}

export function querySelectorAll(element:TTYElement,selector:string){
    return selectAll(selector,element,{adapter});
}