/**
 * Judge if the index is available
 * @param index index
 * @param padding padding of page
 * @param margin margin of page
 * @param range size of screen
 * @param size size of page
 */

export function judgeIsInRange(
    index:number,
    margin:number,
    range:number,
    size:number
){
    if(index+margin>=range)return false;
    if(index>=size)return false;
    return true;
}