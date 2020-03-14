import {EventEmitter} from 'events';
import { StdioInstance } from './StdioInstance';

export class TerminalInstance extends EventEmitter{

    constructor(stdin = process.stdin,stdout = process.stdout){
        super();
        this.stdioInstance = new StdioInstance(stdin,stdout);
    }

    stdioInstance:StdioInstance;

    
}