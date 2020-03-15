process.stdin.setRawMode(true);
process.stdin.on('data',(dat)=>{
    if(dat.readInt8(0)===4)process.exit(0);
    console.log(dat);
})