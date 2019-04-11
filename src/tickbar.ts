import { tick } from "./tick";

interface BarInfo {
    emptyCh: string,
    fillCh: string,
    columns: number,
    prefix: string,
    suffix: string
}
const DEFAULT_BAR: BarInfo = {
    emptyCh: '.',
    fillCh: '=',
    columns: 40,
    prefix: '[',
    suffix: ']',
}

export function buildAsciiBar(value: number, barOption: Partial<BarInfo>) {
    let option = Object.extend({}, DEFAULT_BAR, barOption) as BarInfo;
    let fillCount = Math.round(value * option.columns);
    if (fillCount < 0) fillCount = 0;
    if (fillCount > option.columns) fillCount = option.columns;
    let fillChs = String.from(option.fillCh, fillCount);
    let emptyChs = String.from(option.emptyCh, option.columns - fillCount);
    return `${option.prefix}${fillChs}${emptyChs}${option.suffix}`
}
