import { Cell } from "../stdio/Cell";

export interface Layer{
    margin:[number?,number?];
    padding:[number?,number?];
    zIndex?:number;
    rows?:number;
    columns?:number;
    screen:(Cell|undefined)[][];
}