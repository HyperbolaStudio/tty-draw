process.stdout.write('\u001b[0m');
console.clear();
let d2 = Date.now();
for(let i=0;i<100000;i++){
    process.stdout.write(`\u001b[4${Math.round(Math.random()*32767)%8}m `);
}
let d3 = Date.now();
process.stdout.write('\u001b[0m');
console.clear();
console.log(d3-d2);