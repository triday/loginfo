const { default: log } = require("../../dist/index");


function randomInt() {
    return Math.round(Math.random() * 10000);
}
function writeFormat(num = 5) {
    for (let i = 0; i < num; i++) {
        const a = randomInt();
        const b = randomInt();
        log.debug("{0}*{1}={2}", a, b, a * b);
    }
}
function writeFormatWithWidth(num=5){
    for (let i = 0; i < num; i++) {
        const a = randomInt();
        const b = randomInt();
        log.debug("{0,-5}*{1,5} ={2,9}", a, b, a * b);
    }
}
function writeFormatWithWidthColor(num=5){
    for (let i = 0; i < num; i++) {
        const a = randomInt();
        const b = randomInt();
        log.debug("{0,-5#red}*{1,5#blue} ={2,9#yellow}", a, b, a * b);
    }
}
function writeFormatWithWidthColorFormatter(num=5){
    for (let i = 0; i < num; i++) {
        const a = randomInt();
        const b = randomInt();
        log.debug("{0,-8#red:f2}*{1,8#blue:f2} ={2,12#cyan#bgRed:f2}", a, b, a * b);
    }
}
"".toColorful("bgYellowBright")
log.info("format");
writeFormat();
log.info("format with width");
writeFormatWithWidth();
log.info("format with width and color");
writeFormatWithWidthColor();
log.info("format with width and color formatter");
writeFormatWithWidthColorFormatter();