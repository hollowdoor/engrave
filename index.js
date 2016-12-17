#!/usr/bin/env node
var spawn = require('es-spawn');
var stat = require('fs').stat;
var resolveCommand = require('./lib/resolve_command');
var normalSpawn = require('child_process').spawn;
var getArgv = require('./lib/get_argv');

var cwd = process.cwd();
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
        console.error('engrave says: ',error);
    });
}

function runCommand(){

    return spawnCommand().catch(function(error){
        /*
        Syntax errors will bubble to the surface from rollup.
        These should be show up right away.
        So here we are.
        */

        if(error instanceof SyntaxError){
            return Promise.reject(error);
        }else{
            /*
            No syntax error was found try to use the default.
            */
            return spawnOther();
        }

    })
    .catch(function(error){

        if(error instanceof SyntaxError){
            return Promise.reject(error);
        }

        if(execArgv && !command){
            return runExecArg();
        }
        return Promise.reject(error);
        //console.error('engrave: ', error);
    });
}

function spawnCommand(){
    return resolveCommand(cwd, command).then(function(command){
        return spawn(command, argv, createOptions());
    });
}

function spawnOther(){
    var a = execArgv.concat(argv);
    var o = createOptions();

    return spawn('./index.js', a, o)
    .catch(spawnWith('./main.js', a, o))
    .catch(spawnWith('./engrave.js', a, o));
}

function spawnWith(command, a, o){
    return function spawning(error){
        if(error instanceof SyntaxError){
            return Promise.resolve(error);
        }
        return spawn(command, a, o);
    };
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
        cwd: cwd,
        execPath: execPath,
        execArgv: execArgv,
        env: env,
        argv0: argv0
    };
}
