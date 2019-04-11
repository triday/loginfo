require("tsharp");
const console = require("../dist/index");



console.info("hello info");
console.debug("hello debug");
console.beginTick();

let index = 0;
let id = setInterval(function () {
    let percent = index / 100;
    let barinfo = console.buildAsciiBar(percent)
    console.tick("{0#white}{1,100#red:p2}", barinfo, percent)
    if (index++ >= 100) {
        console.endTick();
        console.info('success');
        clearInterval(id);
    }
}, 100)