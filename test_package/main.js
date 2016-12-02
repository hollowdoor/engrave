import { readFile } from 'fs';
console.log('running ', __filename);
readFile('./file.json', 'utf8', (err, str)=>{
    console.log('file.json contents ', str);
})
