import fork from 'es-fork';

const command = process.argv[2] ? process.argv[2] : null;
const argv = [].concat(process.argv);

main();

function main(){
    runCommand().then(child=>{
        
    }).catch(error=>{
        throw new Error(`something went boom! ${error}`);
    });
}

function runCommand(){
    if(command){
        if(!command.test(/^-/)){
            return forkCommand().catch(error=>{
                return forkDefault();
            });
        }else{
            return forkDefault();
        }
    }else{
        return forkDefault();
    }
}

function forkCommand(){
    return fork(command, argv);
}

function forkDefault(){
    return fork('./titan.js', argv);
}
