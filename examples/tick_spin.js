require("tsharp");
const console = require("../dist/index");
let index = 0;
let id = setInterval(function () {
    let spin = console.buildAsciiSpin(index);
    console.tick("{0}loading.....", spin)
    if (index++ >= 100) {
        console.endTick(true);
        console.info('success');
        clearInterval(id);
    }
}, 100)