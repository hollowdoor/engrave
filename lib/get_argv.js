"use strict";
module.exports = function getArgv(){

    var argv = [].concat(process.argv).slice(2),
        argv_obj = {
            execArgv: [],
            argv: [],
            command: null,
            argv0: process.argv[1]
        };

    while(argv.length){
        if(/^-/.test(argv[0])){
            argv_obj.execArgv.push(argv.shift());
        }else{
            break;
        }

    }

    if(argv.length){
        argv_obj.command = argv.shift();
    }

    argv_obj.argv = argv;

    return argv_obj;

};
