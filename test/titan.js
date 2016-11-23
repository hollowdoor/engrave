import { readFile } from 'fs';
console.log('running titan.js')
readFile('./file.json', 'utf8', (err, str)=>{
    console.log('file.json contents ', str);
})
