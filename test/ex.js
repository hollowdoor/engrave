#!/usr/bin/env engrave
import { readFile } from 'fs';
console.log('shebang!');
console.log('This is an executable.');
//console.log(process.argv);
//console.log('process.env ',process.env)
console.log('process.env.ENGRAVE_ENVIRONMENT ',process.env.ENGRAVE_ENVIRONMENT)
readFile('./file.json', 'utf8', (err, str)=>{
    console.log('file.json contents ', str);
});

function p(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve('yippy!')
        })
    });
}
async function myAsync(){

    let val = await p();
    console.log('success? ', val);
}

myAsync();

/*
Make executable on Linux
chmod u+x ex.js
*/
