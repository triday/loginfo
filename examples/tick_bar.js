require("tsharp");
const console=require("../dist/index");
const DEFAULT_BAR = {
    emptyCh: ' ',
    fillCh: '=',
    columns: 25,
    prefix: '[',
    suffix: ']'
}

function buildBar(value, option = DEFAULT_BAR) {
    option = Object.assign(DEFAULT_BAR, option)
    let fillCount = Math.round(value * option.columns);
    if (fillCount < 0) fillCount = 0;
    if (fillCount > option.columns) fillCount = option.columns;
    let fillChs = String.from(option.fillCh, fillCount);
    let emptyChs = String.from(option.emptyCh, option.columns - fillCount);
    return `${option.prefix}${emptyChs}${fillChs}${option.suffix}`
}
console.info("hello info");
console.debug("hello debug");
console.beginTick();
let index=0;
let id=setInterval(function(){
    if(index>=100){
        clearInterval(id);
    }
    let text='x'.repeat(12);
    console.tick(`${index++}${text}`);
},100)
console.endTick();