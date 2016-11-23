#!/usr/bin/env node
const fork = require('es-fork');
const stat = require('fs').stat;
const command = process.argv[2] ? process.argv[2] : null;
const argv = [].concat(process.argv).slice(3);
const execPath = process.argv[0];
const env = Object.create(process.env);
env.ES_RUN = true;

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
            return forkCommand().catch(error=>{
                if(error instanceof SyntaxError){
                    return Promise.resolve(error);
                }else{
                    return forkDefault();
                }

            });
        }else{
            return forkDefault();
        }
    }else{
        return forkDefault();
    }
}

function forkCommand(){
    return fork(command, argv, {
        execPath: execPath,
        env: env
    });
}

function forkDefault(){
    return fork('./titan.js', argv, {
        execPath: execPath,
        env: env
    });
}
