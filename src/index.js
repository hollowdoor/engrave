#!/usr/bin/env node
const spawn = require('es-spawn');
const stat = require('fs').stat;
const path = require('path');

const command = process.argv[2] ? process.argv[2] : null;
const argv = [].concat(process.argv).slice(3);
const execPath = process.argv[0];
const env = Object.create(process.env);
const thisName = 'engrave';

env[thisName.toUpperCase() + '_ENVIRONMENT'] = true;

main();

function main(){
    //console.log('index.js argv ',argv)
    runCommand().then(child=>{

    }).catch(error=>{
        throw new Error(`something went boom! ${error}`);
    });
}

function runCommand(){
    if(command){
        if(!/^-/.test(command)){
            return spawnCommand().catch(error=>{
                if(error instanceof SyntaxError){
                    return Promise.resolve(error);
                }else{
                    return spawnDefault();
                }

            });
        }else{
            return spawnDefault();
        }
    }else{
        return spawnDefault();
    }
}

function spawnCommand(){
    return spawn(command, argv, createOptions());
}

function spawnDefault(){
    return spawn('./titan.js', argv, createOptions());
}

function createOptions(){
    return {
        execPath: execPath,
        env: env,
        argv0: __filename
    };
}
