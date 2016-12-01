#!/usr/bin/env node
var spawn = require('es-spawn');
var stat = require('fs').stat;
var path = require('path');
var normalSpawn = require('child_process').spawn;
var getArgv = require('./lib/get_argv');

var argv_obj = getArgv();
var command = argv_obj.command;
var argv0 = argv_obj.argv0;
var argv = argv_obj.argv;
var execArgv = argv_obj.execArgv;
var execPath = process.argv[0];
var env = Object.create(process.env);
var thisName = 'engrave';

env[thisName.toUpperCase() + '_ENVIRONMENT'] = true;

main();

function main(){

    runCommand().then(function(child){
        /*
        Nothing to do here yet.
        The command was successful, but what should happen to the child?
        */
    }).catch(error=>{
        console.error(`something went boom! ${error}`);
    });
}

function runCommand(){

    if(command){
        /*
        The first argument value might be a command, or a flag.
        If it's a flag then try the default.
        */
        if(!/^-/.test(command)){
            return spawnCommand().catch(function(error){
                /*
                Syntax errors will bubble to the surface from rollup.
                These should be show up right away.
                So here we are.
                */
                if(error instanceof SyntaxError){
                    return Promise.resolve(error);
                }else{
                    /*
                    No syntax error was found try to use the default.
                    */
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
    /*
    The default can be used instead of a command from arguments.
    */
    return spawn('./engrave.js', execArgv.concat(argv), createOptions())
    .catch(function(error){

        if(execArgv){
            return runExecArg();
        }

        console.error(
            'Error: No first argument to engrave, '+
            'or no engrave.js file found. '+
            'Run the engrave command like `engrave filename.js`'
        );
    });
}

function runExecArg(){
    /*
    This might not always work.
    More testing needs to be done.
    */
    return new Promise(function(resolve, reject){
        var child = normalSpawn('node', execArgv, {
            stdio: 'inherit'
        });

        child.on('error', reject);
        child.on('close', resolve)
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
