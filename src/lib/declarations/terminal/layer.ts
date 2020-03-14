import { Cell } from "../stdio/Cell";

export interface Layer{
    left?:number;
    top?:number;
    rows?:number;
    columns?:number;
    screen:Cell[];
}