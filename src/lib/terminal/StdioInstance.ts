import escapes from 'ansi-escapes';
import styles from 'ansi-styles';
import convert from 'key-convert';
import {EventEmitter} from 'events';
import { Cell, ModifierString, modifierMap, isColor16String, color16Map, isColor256, isColorRGB } from '../declarations/stdio/Cell';
import { Constants } from './constants';
import stringWidth from 'string-width';

// export const f = require('fs').createWriteStream('a.txt');

export class StdioInstance extends EventEmitter{

    constructor(stdin:NodeJS.ReadStream = process.stdin,stdout:NodeJS.WriteStream = process.stdout){
        super();
        stdin.setRawMode(true);
        stdout.isTTY = true;
        this.stdin = stdin;
        this.stdout = stdout;
        this.console = new console.Console(stdout);
        this.console.clear();
        this.stdin.on('data',(chunk)=>{
            this.emit(Constants.StdioEvents.input,convert(chunk));
        });
    }
    stdin:NodeJS.ReadStream;
    stdout:NodeJS.WriteStream;
    console:Console;

    clear(){
        this.console.clear();
    }

    _currentCursorX:number = -1;
    _currentCursorY:number = -1;

    cursorTo(x:number,y?:number){
        if((x!==this._currentCursorX||y!==this._currentCursorY)){
            this.stdout.write(escapes.cursorTo(x,y));
            this._currentCursorX = x;
            this._currentCursorY = y?y:this._currentCursorY;
        }
    }

    cursorAutoForward(width:number){
        if(this._currentCursorX===-1||this._currentCursorY===-1){
            this.cursorTo(0,0);
        }
        this._currentCursorX+=width;
        if(this._currentCursorX>=this.stdout.columns){
            this._currentCursorX = 0;
            this._currentCursorY++;
        }
        if(this._currentCursorY>=this.stdout.rows){
            this._currentCursorY--;
        }
    }

    protected _cursorHidden = false;
    cursorHide(){
        this.stdout.write(escapes.cursorHide);
        this._cursorHidden = true;
    }
    cursorShow(){
        this.stdout.write(escapes.cursorShow);
        this._cursorHidden = false;
    }
    cursorDisplayToggle(){
        if(this._cursorHidden){
            this.cursorShow();
        }else{
            this.cursorHide();
        }
    }

    writeCell(cell:Cell,x:number,y:number){
        if(typeof(cell.char)==='symbol'){
            //do nothing
        }else{
            this.cursorTo(x,y);
            let openEscapes:string[] = [];
            let closeEscapes:string[] = [];
            if(cell.modifiers){
                for(let _mod in cell.modifiers){
                    let mod = _mod as ModifierString;
                    if(cell.modifiers[mod]){
                        openEscapes.push(modifierMap[mod].open);
                        closeEscapes.unshift(modifierMap[mod].close);
                    }
                }
            }
            if(cell.color){
                if(isColor16String(cell.color)){
                    openEscapes.push(color16Map[cell.color].foreground.open);
                    closeEscapes.unshift(color16Map[cell.color].foreground.close);
                }else if(isColor256(cell.color)){
                    openEscapes.push(styles.color.ansi.ansi256(cell.color.ansi256));
                    closeEscapes.unshift(styles.color.close);
                }else if(isColorRGB(cell.color)){
                    openEscapes.push(styles.color.ansi.rgb(cell.color.r,cell.color.g,cell.color.b));
                    closeEscapes.unshift(styles.color.close);
                }
            }
            if(cell.bgColor){
                if(isColor16String(cell.bgColor)){
                    openEscapes.push(color16Map[cell.bgColor].background.open);
                    closeEscapes.unshift(color16Map[cell.bgColor].background.close);
                }else if(isColor256(cell.bgColor)){
                    openEscapes.push(styles.bgColor.ansi.ansi256(cell.bgColor.ansi256));
                    closeEscapes.unshift(styles.bgColor.close);
                }else if(isColorRGB(cell.bgColor)){
                    openEscapes.push(styles.bgColor.ansi.rgb(cell.bgColor.r,cell.bgColor.g,cell.bgColor.b));
                    closeEscapes.unshift(styles.bgColor.close);
                }
            }
            let writeChar = cell.char?cell.char[0]:' ';
            this.stdout.write(
                openEscapes.join('')+
                (writeChar)+
                closeEscapes.join('')
            );
            this.cursorAutoForward(stringWidth(writeChar));
        }
    }
}