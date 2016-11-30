#!/usr/bin/env node
const spawn = require('es-spawn');
const stat = require('fs').stat;
const path = require('path');
const normalSpawn = require('child_process').spawn;
const getArgv = require('./lib/get_argv');

const argv_obj = getArgv();
const command = argv_obj.command;
const argv0 = argv_obj.argv0;
const argv = argv_obj.argv;
const execArgv = argv_obj.execArgv;
const execPath = process.argv[0];
const env = Object.create(process.env);
const thisName = 'engrave';

env[thisName.toUpperCase() + '_ENVIRONMENT'] = true;

main();

function main(){

    if(argv.indexOf('--help') !== -1 || argv.indexOf('-h') !== -1){
        console.log('helpful')
    }

    runCommand().then(child=>{

    }).catch(error=>{
        throw new Error(`something went boom! ${error}`);
    });
}

function runCommand(){
    console.log('what')
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
    return spawn('./engrave.js', argv, createOptions())
    .catch(function(error){
        console.error(
            'Error: No first argument to engrave, '+
            'or no engrave.js file found. '+
            'Run the engrave command like `engrave filename.js`'
        );
    });
}

function createOptions(){
    return {
        execPath: execPath,
        execArgv: execArgv,
        env: env,
        argv0: argv0
    };
}
