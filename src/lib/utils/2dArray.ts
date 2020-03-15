export function set2dArray<T>(array:T[][],i:number,j:number,val:T){
    if(!array[i]){
        array[i] = [];
    }
    array[i][j] = val;
}

export function get2dArray<T>(array:T[][],i:number,j:number):T|undefined{
    if(array[i]){
        return array[i][j];
    }else{
        return undefined;
    }
}