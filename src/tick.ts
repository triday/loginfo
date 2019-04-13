import { info, buildMsg } from './log';
import { supportTick } from './env';


let lastText = '';
/**
 * 开始一次tick操作
 */
export function beginTick(): void {
    if (supportTick) {
        lastText = '';
    }
}
/**
 * 结束一次tick操作
 * @param clearBefore 是否清楚之前tick的消息，默认为 false。
 */
export function endTick(clearBefore: boolean = false): void {
    if (supportTick) {
        if (clearBefore) {
            const ctrlStr = getGobackCtrlText(lastText);
            process.stdout.write(ctrlStr);
        } else {
            process.stdout.write('\n');
        }
        lastText = '';
    }
}
function getGobackCtrlText(text: string): string {
    const MOVE_LEFT = '\x1b[1000D';
    const MOVE_UP = '\x1b[1A';
    const CLEAR_LINE = '\x1b[0K';

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
/**
 * 执行一次tick，执行tick的时候会覆盖上一次tick的输出，覆盖操作只在nodejs环境下有效。
 * @param message 要输出的消息，可以携带格式化参数，参考 String.format 格式化。
 * @param args 消息的格式化参数
 */
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

