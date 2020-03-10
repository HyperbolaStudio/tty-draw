import Yallist from "yallist";

export function insertNodeBefore<T extends T2,T2>(val:T,list:Yallist<T2>,node?:Yallist.Node<T2>|null|undefined){
    let newNode;
    if(node){
        newNode = new Yallist.Node(val,node.prev as any,node,list);
        node.prev = newNode;
        if(newNode.prev){
            newNode.prev.next = newNode;
        }else{
            list.head = newNode;
        }
    }else{
        newNode = new Yallist.Node(val,list.tail as any,undefined,list);
        if(newNode.prev){
            newNode.prev.next = newNode;
        }
        list.tail = newNode;
    }
    list.length++;
    return newNode;
}