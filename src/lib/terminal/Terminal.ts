import { TerminalInstance } from "./TerminalInstance";
import { TTYDocument } from "../layout/dom/TTYDocument";
import { getFile } from "../utils/getFile";
import {xml2js, Element} from 'xml-js';



export class Terminal{

    constructor(path:string){(async()=>{
        let file = await getFile(path);
        this.fileURL = file.fileURL;
        let xmlObject = xml2js(file.fileData);
        
        
    })()}

    protected _constructDocument(xmlObject:Element){
        this.document = new TTYDocument();
        let root = this.document.createElement('tty');
        this.document.setRoot(root);

    }

    terminalInstance = new TerminalInstance();

    fileURL!: string;
    document!: TTYDocument;
}