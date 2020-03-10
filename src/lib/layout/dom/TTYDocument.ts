import { TTYNode } from "./TTYNode";
import { TTYElement } from "./TTYElement";

export class TTYDocument extends TTYNode{
    _ownerDocument = this;
}