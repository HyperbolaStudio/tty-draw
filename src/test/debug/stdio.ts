import { StdioInstance } from "../../lib/terminal/StdioInstance";
import escapes from 'ansi-escapes';
let stdio = new StdioInstance();
let n = parseInt(process.argv[2]);
n=n?n:10;
console.clear();
let r = process.stdout.rows;
let c = process.stdout.columns;
let d = Date.now();
for(let i=0;i<n;i++){
    stdio.stdout.write(escapes.cursorTo(0,0));
    for(let y=0;y<r;y++){
        for(let x=0;x<c;x++){
            stdio.writeCell({
                color:{ansi256:Math.round((Math.random()*32767)%256)},
                bgColor:{ansi256:Math.round((Math.random()*32767)%256)},
                char:String.fromCharCode(32+Math.round(Math.random()*32767%94)),
            },x,y);
        }
    }
}
let d1 = Date.now();
console.log(n,d1-d);