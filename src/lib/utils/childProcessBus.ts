import { MainHandler, FunctionCollection, ChildHandler } from '../declarations/childProcessBus.ts/FunctionCollection';

export function processCallerBus<Collection extends FunctionCollection>(proc:NodeJS.Process):MainHandler<Collection>{
    return (key,request)=>{
        return new Promise((resolve,reject)=>{
            proc.send!({key,request});
            proc.once('message',(msg)=>{
                resolve(msg.response);
            });
        });
    }
}

export function processCalleeBus<Collection extends FunctionCollection>(proc:NodeJS.Process):ChildHandler<Collection>{
    return (map)=>{
        proc.on('message',async(msg)=>{
            if(msg.key in map){
                process.send!({
                    key:msg.key,
                    response:await map[msg.key](msg.request),
                });
            }
        });
    }
}