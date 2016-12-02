var readFile = require('mz/fs').readFile;
var realpathSync = require('mz/fs').realpathSync;
var path = require('path');

module.exports = function resolveCommand(cwd, command){

    if(command){

        try{
            if(realpathSync(command) !== command){
                return Promise.resolve(realpathSync(command));
            }
        }catch(err){}        

        if(!/[.]js$/.test(command)){
            command = command + '.js';
        }

        return Promise.resolve(command);
    }else{

        return readFile(path.join(cwd, 'package.json'), 'utf8')
        .then(function(pack0){
            var pack;
            try{
                pack = JSON.parse(pack0);
            }catch(err){
                return Promise.reject(err);
            }

            if(pack['jsnext:main'] && typeof pack['jsnext:main'] === 'string'){
                return pack['jsnext:main'];
            }else if(pack['main'] && typeof pack['main'] === 'string'){
                return pack['main'];
            }else{
                return Promise.reject(null);
            }
        })
    }
};
