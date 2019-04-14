const { default: log } = require("../../dist/index");


function randomInt() {
    return Math.round(Math.random() * 10000);
}
function writeFormat(num = 10) {
    for (let i = 0; i < num; i++) {
        const a = randomInt();
        const b = randomInt();
        log.debug("{0}*{1}={2}", a, b, a * b);
    }
}
function WriteFormatWithWidth(num=10){
    for (let i = 0; i < num; i++) {
        const a = randomInt();
        const b = randomInt();
        log.debug("{0,-5}*{1,5} ={2,9}", a, b, a * b);
    }
}

writeFormat();
log.empty();
WriteFormatWithWidth();