'use strict';
__dirname="/home/spirit/Projects/JSLibs/engrave/test"; __filename="/home/spirit/Projects/JSLibs/engrave/test/run.js";

        process.argv[0] = '/usr/bin/engrave';
        process.argv.splice(1, 1, "/home/spirit/Projects/JSLibs/engrave/test/run.js");


var fs = require('fs');

/*console.log('running run.js');
console.log('process.argv ',process.argv);
console.log('process.argv0 ',process.argv0)*/
//console.log('process.env ',process.env)
console.log('running ', __filename);
fs.readFile('./file.json', 'utf8', (err, str) => {
    console.log('file.json contents ', str);
});
