import escapes from 'ansi-escapes';
import styles from 'ansi-styles';
import {EventEmitter} from 'events';
import { Cell, ModifierString, modifierMap, isColor16String, color16Map, isColor256, isColorRGB } from '../declarations/stdio/CellOption';

export class StdioInstance extends EventEmitter{

    constructor(stdin:NodeJS.ReadStream = process.stdin,stdout:NodeJS.WriteStream = process.stdout){
        super();
        stdin.setRawMode(true);
        stdout.isTTY = true;
        this.stdin = stdin;
        this.stdout = stdout;
        this.console = new console.Console(stdout);
    }
    stdin:NodeJS.ReadStream;
    stdout:NodeJS.WriteStream;
    console:Console;

    clear(){
        this.console.clear();
    }

    _currentCursorX:number = -1;
    _currentCursorY:number = -1;

    writeCell(cell:Cell,x:number,y:number){
        if((x!=this._currentCursorX||y!=this._currentCursorY)){
            this.stdout.write(escapes.cursorTo(x,y));
            this._currentCursorX = x+1;
            this._currentCursorY = y?y:this._currentCursorY;
        }else{
            this._currentCursorX++;
        }
        if(this._currentCursorX>=this.stdout.columns){
            this._currentCursorX = 0;
            this._currentCursorY++;
        }
        if(this._currentCursorY>=this.stdout.rows){
            this._currentCursorX = this._currentCursorY = -1;
        }
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
        this.stdout.write(
            openEscapes.join('')+
            (cell.char?cell.char[0]:' ')+
            closeEscapes.join('')
        );
    }
}