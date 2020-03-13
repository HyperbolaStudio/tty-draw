import { TTYLIElement } from "../../layout/dom/elements/TTYLIElement";
import { TTYElement } from "../../layout/dom/TTYElement";
import { TTYAnchorElement } from "../../layout/dom/elements/TTYAnchorElement";

export interface TTYElementsCollection{

    //markdown-featured article elements

    //headings

    h1:TTYElement,
    h2:TTYElement,
    h3:TTYElement,
    h4:TTYElement,
    h5:TTYElement,
    h6:TTYElement,

    //list

    li:TTYLIElement,
    ul:TTYElement,
    ol:TTYElement,

    //text style

    em:TTYElement,
    strong:TTYElement,

    //paragraph

    p:TTYElement,
    hr:TTYElement,
    br:TTYElement,

    //hyperlink

    a:TTYAnchorElement,

    //image

    // img:TTYImageElement;

    //table

    // table:TTYTableElement;
    // thead:TTYTableSectionElement;
    // tbody:TTYTableSectionElement;
    // tr:TTYTableRowElement;
    // td:TTYTableDataCellElement;



    //form elements

    // form:TTYFormElement;
    // input:TTYInputElement;//To implement: text, number, radio, checkbox, range, password
    // option:TTYOptionElement;
    // progress:TTYProgressElement;
    // button:TTYButtonElement;



    div:TTYElement,
    span:TTYElement,

    head:TTYElement,
    body:TTYElement,
    // style:TTYStyleElement;
    // link:TTYLinkElement;
    // script:TTYScriptElement;

    tty:TTYElement,
}

export const TTYElementConstructors:{
    [K in keyof TTYElementsCollection]:{
        new(tagName:string):TTYElementsCollection[K];
    }
} = {
        //markdown-featured article elements

    //headings

    h1:TTYElement,
    h2:TTYElement,
    h3:TTYElement,
    h4:TTYElement,
    h5:TTYElement,
    h6:TTYElement,

    //list

    li:TTYLIElement,
    ul:TTYElement,
    ol:TTYElement,

    //text style

    em:TTYElement,
    strong:TTYElement,

    //paragraph

    p:TTYElement,
    hr:TTYElement,
    br:TTYElement,

    //hyperlink

    a:TTYAnchorElement,

    //image

    // img:TTYImageElement;

    //table

    // table:TTYTableElement;
    // thead:TTYTableSectionElement;
    // tbody:TTYTableSectionElement;
    // tr:TTYTableRowElement;
    // td:TTYTableDataCellElement;



    //form elements

    // form:TTYFormElement;
    // input:TTYInputElement;//To implement: text, number, radio, checkbox, range, password
    // option:TTYOptionElement;
    // progress:TTYProgressElement;
    // button:TTYButtonElement;



    div:TTYElement,
    span:TTYElement,

    head:TTYElement,
    body:TTYElement,
    // style:TTYStyleElement;
    // link:TTYLinkElement;
    // script:TTYScriptElement;

    tty:TTYElement,
}