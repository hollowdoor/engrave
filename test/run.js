import { readFile } from 'fs';
/*console.log('running run.js');
console.log('process.argv ',process.argv);
console.log('process.argv0 ',process.argv0)*/
//console.log('process.env ',process.env)
readFile('./file.json', 'utf8', (err, str)=>{
    console.log('file.json contents ', str);
})
