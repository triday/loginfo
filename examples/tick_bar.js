const { default: console,buildAsciiProgress } = require("../dist/index");
require("tsharp");


console.error("abc".toColorful("bold"));

console.info("hello info".toColorful("greenBright"));
console.debug("hello debug".toColorful("yellow"));
console.beginTick();

let index = 0;
let id = setInterval(function () {
    let percent = index / 100;
    let barinfo = buildAsciiProgress(percent, { emptyCh: '+', })
    console.tick("{0#yellowBright}{1#greenBright:p2}", barinfo, percent)
    if (index++ >= 100) {
        console.endTick();
        console.info('success');
        clearInterval(id);
    }
}, 100)