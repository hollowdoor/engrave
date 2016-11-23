#! /usr/bin/env node
import { readFile } from 'fs';
console.log('running shebang.js')
readFile('./file.json', 'utf8', (err, str)=>{
    console.log('file.json contents ', str);
})
