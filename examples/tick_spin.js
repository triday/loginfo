require("tsharp");
const console = require("../dist/index");
let index = 0;
let id = setInterval(function () {
    let spin = console.buildAsciiSpin(index);
    console.tick("loading......{0}", spin)
    if (index++ >= 100) {
        console.endTick(true);
        console.info('success');
        clearInterval(id);
    }
}, 100)
function run(step){
    
}
setTimeout(() => {
    if(index<100){

    }
}, (100));