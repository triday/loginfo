import "tsharp";

interface BarInfo {
    emptyCh: string,
    fillCh: string,
    columns: number,
    prefix: string,
    suffix: string
}
const DEFAULT_BAR: BarInfo = {
    emptyCh: '░',
    fillCh: '█',
    columns: 25,
    prefix: '[',
    suffix: ']',
}
/**
 * 根据百分比的值，构造Ascii进度条的图案。
 * @param value 百分比，小数,范围[0,1]。
 * @param barOption 进度条图案的参数配置 
 */
export function buildAsciiProgress<K extends keyof BarInfo>(value: number, barOption: Pick<BarInfo, K> = DEFAULT_BAR) {
    let option = Object.extend({}, DEFAULT_BAR, barOption) as BarInfo;
    let fillCount = Math.round(value * option.columns);
    if (fillCount < 0) fillCount = 0;
    if (fillCount > option.columns) fillCount = option.columns;
    let fillChs = String.from(option.fillCh, fillCount);
    let emptyChs = String.from(option.emptyCh, option.columns - fillCount);
    return `${option.prefix}${fillChs}${emptyChs}${option.suffix}`
}


const DEFAULT_SPIN = ['-', '\\', '|', '/']
//const DEFAULT_SPIN2=['◒','◐','◓','◑']
/**
 * 根据计数器的值构造旋转加载的图案。
 * @param counter 计数器的值，每次的传值应该在上一次的基础上加一。
 * @param spinChars 图案字符的状态数组
 */
export function buildAsciiSpin(counter: number, spinChars: string[] = DEFAULT_SPIN): string {
    if (spinChars.length == 0) return '';
    const index = Math.round(Math.abs(counter)) % spinChars.length;
    return spinChars[index];
}
/**
 * 根据计数器的值构造加载中的图案
 * @param counter 计数器的值，每次的传值应该在上一次的基础上加一。
 * @param maxLength 最大显示长度，超过此长度会循环从头开始显示。
 * @param loadingChar 图案字符
 */
export function buildAsciiLoading(counter: number, maxLength: number = Infinity, loadingChar: string = '.'): string {
    if (maxLength <= 0) return '';
    if (!loadingChar) return '';
    const actualCount = maxLength < Infinity ? counter % maxLength : counter;
    return String.from(loadingChar, actualCount);
}


