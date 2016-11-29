'use strict';
__dirname="/home/spirit/Projects/JSLibs/es_run/test";
__filename="ex.js";
process.argv.splice(1, 1, "./ex.js");
            

var fs = require('fs');
let myAsync = (() => {
    var _ref = _asyncToGenerator(function* () {

        let val = yield p();
        console.log('success? ', val);
    });

    return function myAsync() {
        return _ref.apply(this, arguments);
    };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

console.log('shebang!');
console.log('This is an executable.');
console.log(process.argv);
//console.log('process.env ',process.env)
console.log('process.env.ES_RUN ', process.env.ES_RUN);
fs.readFile('./file.json', 'utf8', (err, str) => {
    console.log('file.json contents ', str);
});

function p() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('yippy!');
        });
    });
}


myAsync();

/*
Make executable on Linux
chmod u+x ex.js
*/
