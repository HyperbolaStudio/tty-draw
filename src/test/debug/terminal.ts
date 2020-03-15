import { TerminalInstance } from "../../lib/terminal/TerminalInstance";
import { Layer } from "../../lib/declarations/terminal/layer";
import { KeyInput, Keys } from "key-convert/out/lib/KeyInput";

let ti = new TerminalInstance();
let layer0:Layer = {
    margin:[0,0],
    padding:[0,0],
    screen:[],
}

ti.stdioInstance.cursorHide();

let layer1:Layer = {
    margin:[3,4],
    padding:[0,0],
    screen:[],
}
let layer2:Layer = {
    margin:[0,0],
    padding:[],
    screen:[],
};
ti.layers.push(layer0,layer1,layer2);
ti.fill(layer0,0,0,process.stdout.rows-1,process.stdout.columns-1,{
    bgColor:'white',
})
ti.fill(layer1,0,0,12,40,{
    bgColor:'yellow',
})
ti.fill(layer1,0,0,8,8,{
    bgColor:'blue',
    char:'a',
});
ti.fill(layer2,0,0,5,5,{
    bgColor:'red',
    char:'b',
})
ti.render();
ti.write();
ti.stdioInstance.on('input',(k:KeyInput)=>{
    if(k.type=='non-printable'&&k.keys[0] == Keys.esc){
        ti.stdioInstance.clear();
        process.exit(0);
    }
    if(k.type=='non-printable'){
        switch(k.keys[0]){
            case Keys.up:
                (layer1.margin[1] as any)--;
                break;
            case Keys.down:
                (layer1.margin[1] as any)++;
                break;
            case Keys.left:
                (layer1.margin[0] as any)--;
                break;
            case Keys.right:
                (layer1.margin[0] as any)++;
                break;
        }
    }else if(k.type=='printable'){
        switch(k.sequence){
            case 'w':
                (layer2.margin[1] as any)--;
                break;
            case 's':
                (layer2.margin[1] as any)++;
                break;
            case 'a':
                (layer2.margin[0] as any)--;
                break;
            case 'd':
                (layer2.margin[0] as any)++;
                break;
        }
    }
    ti.render();
    ti.write();
})
//process.exit(0);