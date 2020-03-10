import { TTYHeadingElement } from "../layout/dom/elements/TTYHeadingElement";
import { TTYLIElement } from "../layout/dom/elements/TTYLIElement";

export interface TTYElementsCollection{

    //markdown-featured article elements

    //headings

    h1:TTYHeadingElement;
    h2:TTYHeadingElement;
    h3:TTYHeadingElement;
    h4:TTYHeadingElement;
    h5:TTYHeadingElement;
    h6:TTYHeadingElement;

    //list

    li:TTYLIElement;
    // ul:TTYUListElement;
    // ol:TTYOListElement;

    //text style

    // em:TTYElement;
    // strong:TTYElement;

    //paragraph

    // p:TTYParagraphElement;
    // hr:TTYHRElement;
    // br:TTYBRElement;

    //hyperlink

    // a:TTYAnchorElement;

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



    // div:TTYDivElement;
    // span:TTYSpanElement;

    // head:TTYHeadElement;
    // body:TTYBodyElement;
    // style:TTYStyleElement;
    // link:TTYLinkElement;
    // script:TTYScriptElement;

    // tty:TTYTtyElement;
}