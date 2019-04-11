import { info, buildMsg } from './log';

const isWindow = () => typeof window !== "undefined";
const isInProcess = () => typeof process !== "undefined";
const supportTick = !isWindow() && isInProcess();
const MOVE_LEFT = '\x1b[1000D';
const MOVE_UP = '\x1b[1A';
const CLEAR_LINE = '\x1b[0K';
let lastText = '';
export function beginTick(): void {
    if (supportTick) {
        lastText = '';
    }
}
export function endTick(): void {
    if (supportTick) {
        process.stdout.write('\n');
    }
}
function getGobackCtrlText(text: string): string {
    if (!text) return '';
    let column = process.stdout.columns || 100;
    let allLineCount = text.split('\n')
        .map(p => {
            let lineWidth = p.width();
            if (lineWidth <= column) return 1;
            return Math.ceil(lineWidth / column);
        })
        .sum();
    let ctrlStr = '';
    for (var i = 0; i < allLineCount; i++) {
        ctrlStr += MOVE_LEFT + CLEAR_LINE + (i < allLineCount - 1 ? MOVE_UP : '');
    }
    return ctrlStr;
}
export function tick(message: string, ...args: any[]) {
    if (supportTick) {
        const ctrlStr = getGobackCtrlText(lastText);
        const currentText = buildMsg("info", message, ...args);
        process.stdout.write(ctrlStr + currentText);
        lastText = currentText;
    } else {
        info(message, ...args);
    }

}


import * as t from './tick';
