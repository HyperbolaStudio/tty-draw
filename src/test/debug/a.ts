import { StdioInstance } from "../../lib/terminal/StdioInstance";
import { Constants } from "../../lib/terminal/constants";

let si = new StdioInstance();
si.writeCell({char:'我'},5,5);
si.on('input',()=>{
    si.writeCell({char:Constants.WIDTH_PLACEHOLDER},6,5);
    si.writeCell({char:'我'},7,5);
    process.exit(0);
});