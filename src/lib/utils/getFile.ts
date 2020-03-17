import * as fs from 'fs';
import * as url from 'url';
import * as http from 'http';

export function getFile(loc:string):Promise<{fileURL:string,fileData:string}>{
    return new Promise((resolve,reject)=>{
        let fileURL:url.URL = url.parse('loc') as any as url.URL;
        if(!fileURL.protocol){
            fileURL = url.pathToFileURL(loc);
            fs.readFile(loc,(err,data)=>{
                if(err){
                    reject(err);
                }else{
                    resolve({
                        fileURL:fileURL.toString(),
                        fileData:data.toString(),
                    });
                }
            });
        }else{
            let fileData = '';
            http.get(fileURL,(res)=>{
                res.on('data',(chunk)=>{
                    fileData+=chunk.toString();
                });
                res.on('end',()=>{
                    resolve({fileURL:fileURL.toString(),fileData});
                });
            });
        }
    });
}