import {EventEmitter} from 'events';
import { StdioInstance } from './StdioInstance';
import { Layer } from '../declarations/terminal/layer';
import { Cell } from '../declarations/stdio/Cell';
import { set2dArray, get2dArray } from '../utils/2dArray';
import Yallist from 'yallist';
import { optional } from '../utils/optional';
import { judgeIsInRange } from '../utils/judgeIsInRange';
import { compareCell, cloneCell } from '../utils/cellUtils';
import stringWidth from 'string-width';
import { Constants } from './constants';

export class TerminalInstance extends EventEmitter{

    static UNRENDERED_ERROR = new Error('Write before rendered.')

    constructor(stdin = process.stdin,stdout = process.stdout){
        super();
        this.stdioInstance = new StdioInstance(stdin,stdout);
    }

    stdioInstance:StdioInstance;

    layers:Yallist<Layer> = Yallist.create();

    protected _rendered?:Layer;

    protected _currentScreen?:Layer;

    protected _setCell(
        layer:Layer,
        row:number,
        column:number,
        cell:Cell|undefined
    ){
        set2dArray(layer.screen,row,column,cell);
    }

    fill(
        layer:Layer,
        rowFrom:number,
        columnFrom:number,
        rowTo:number,
        columnTo:number,
        cell:Cell|undefined,
    ){
        for(let r=rowFrom;r<=rowTo;r++){
            for(let c=columnFrom;c<=columnTo;c++){
                this._setCell(layer,r,c,cell);
                if(cell&&typeof(cell.char)==='string'){
                    let placeHold = stringWidth(cell.char)-1;
                    while(placeHold-- > 0){
                        c++;
                        this._setCell(layer,r,c,{char:Constants.WIDTH_PLACEHOLDER});
                    }
                }
            }
        }
    }

    fillText(
        layer:Layer,
        rowFrom:number,
        columnFrom:number,
        rowTo:number,
        columnTo:number,
        templateCell:Cell|undefined,
        text:string,
        indent:number = 0,
        hyphenAtNewLine:boolean = false,
    ){
        let indented:boolean = false;
        let index = 0;
        for(let r=rowFrom;r<=rowTo;r++){
            let holdLine = false;
            for(let c=columnFrom;c<=columnTo;c++){
                if(holdLine){
                    continue;
                };
                if(!indented){
                    c+=indent;
                    indented = true;
                }
                let cell = {
                    ...templateCell,
                    char:text[index++],
                }
                if(cell.char == undefined)return;
                if(cell.char == '\n'){
                    holdLine = true;
                    continue;
                }
                this._setCell(layer,r,c,cell);
                if(cell&&typeof(cell.char)==='string'){
                    let placeHold = stringWidth(cell.char)-1;
                    while(placeHold-- > 0){
                        c++;
                        this._setCell(layer,r,c,{char:Constants.WIDTH_PLACEHOLDER});
                    }
                }
            }
        }
    }

    render(){
        this._flush();
        let drawLayers = [...this.layers.toArray()].sort((a,b)=>{
            let zIndexA = optional(a.zIndex,0);
            let zIndexB = optional(b.zIndex,0);
            if(zIndexA<zIndexB)return -1;
            else if(zIndexA===zIndexB)return 0;
            else return 1;
        });
        if(!this._rendered){
            this._rendered = {
                margin:[],
                padding:[],
                rows:this.stdioInstance.stdout.rows,
                columns:this.stdioInstance.stdout.columns,
                screen:[],
            }
        }
        for(let layer of drawLayers){
            let marginOfColumn = optional(layer.margin[0],0);
            let marginOfRow = optional(layer.margin[1],0);
            let paddingOfColumn = optional(layer.padding[0],0);
            let paddingOfRow = optional(layer.padding[1],0);
            let rows = optional(layer.rows,this.stdioInstance.stdout.rows);
            let columns = optional(layer.columns,this.stdioInstance.stdout.columns);
            for(
                let r=0;
                judgeIsInRange(
                    r,
                    marginOfRow,
                    this.stdioInstance.stdout.rows,
                    rows
                );
                r++
            ){
                for(
                    let c=0;
                    judgeIsInRange(
                        c,
                        marginOfColumn,
                        this.stdioInstance.stdout.columns,
                        columns
                    );
                    c++
                ){
                    let cell = get2dArray(layer.screen,r-paddingOfRow,c-paddingOfColumn);
                    if(cell){
                        set2dArray(
                            this._rendered.screen,
                            r+marginOfRow,
                            c+marginOfColumn,
                            cell,
                        );
                    }
                }
            }
        }
        
    }

    protected _flush(){
        this._rendered = undefined;
    }

    write(forceRewrite?:boolean){
        if(!this._rendered){
            throw TerminalInstance.UNRENDERED_ERROR;
        }
        if(!this._currentScreen || forceRewrite){
            forceRewrite = true;
            this._currentScreen = {
                margin:[],
                padding:[],
                rows:this.stdioInstance.stdout.rows,
                columns:this.stdioInstance.stdout.columns,
                screen:[],
            }
        }
        for(let r = 0;r < this.stdioInstance.stdout.rows;r++){
            for(let c = 0;c< this.stdioInstance.stdout.columns;c++){
                if(forceRewrite||!compareCell(
                    get2dArray(this._currentScreen.screen,r,c),
                    get2dArray(this._rendered.screen,r,c),
                )){
                    let cell = cloneCell(get2dArray(
                        this._rendered.screen,r,c
                    ));
                    set2dArray(this._currentScreen.screen,r,c,cell);
                    if(cell){
                        this.stdioInstance.writeCell(cell,c,r);
                    }else{
                        this.stdioInstance.writeCell({char:' '},c,r);
                    }
                }
            }
        }
    }
}