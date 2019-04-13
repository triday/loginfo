require("tsharp");
const console = require("../dist/index");
let index = 0;
let id = setInterval(function () {
    let spin = console.buildAsciiSpin(index);
    let loading = console.buildAsciiLoading(index / 10, 30);
    console.tick("{0}loading{1}", spin, loading)
    if (index++ >= 100) {
        console.endTick(true);
        console.info('success');
        clearInterval(id);
    }
}, 100)