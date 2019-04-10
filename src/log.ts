import { convertMsgToConsole } from './msg_convert'
import { LOG_TYPE, GetConfig } from './config';
/**
 * 输出 debug 级别的消息。
 * @param message 要输出的消息，可以携带格式化参数。
 * @param args 消息的格式化参数。参考 String.format 格式化
 */
export function debug(message: string, ...args: any[]): void {
    let msg = buildMsg("debug", message, ...args);
    writeMsg(msg, console.log);
}
/**
 * 输出 info 级别的消息。
 * @param message 要输出的消息，可以携带格式化参数，参考 String.format 格式化。
 * @param args 消息的格式化参数
 */
export function info(message: string, ...args: any[]): void {
    let msg = buildMsg("info", message, ...args);
    writeMsg(msg, console.log);
}
/**
 * 输出 warn 级别的消息。
 * @param message 要输出的消息，可以携带格式化参数，参考 String.format 格式化。
 * @param args 消息的格式化参数
 */
export function warn(message: string, ...args: any[]): void {
    let msg = buildMsg("warn", message, ...args);
    writeMsg(msg, console.warn);
}
/**
 * 输出 error 级别的消息。
 * @param message 要输出的消息，可以携带格式化参数，参考 String.format 格式化。
 * @param args 消息的格式化参数
 */
export function error(message: string, ...args: any[]): void {
    let msg = buildMsg("error", message, ...args);
    writeMsg(msg, console.error);
}
/**
 * 输出 fatal 级别的消息。
 * @param message 要输出的消息，可以携带格式化参数，参考 String.format 格式化。
 * @param args 消息的格式化参数
 */
export function fatal(message: string, ...args: any[]): void {
    let msg = buildMsg("fatal", message, ...args);
    writeMsg(msg, console.error);
}

export function buildMsg(type: LOG_TYPE, message: string, ...args: any[]): string {
    let lineText = String.format(message, ...args);
    // let setting = GetConfig(type);
    // let formatLineText = setting.format ? setting.format(lineText, type) : lineText;
    // let colorfulText = formatLineText.toColorful(setting.fore, setting.back, ...setting.styles);
    return lineText.toColorful("red");
}
const isInBrowser = typeof window !== "undefined";
const supportStyle = true;
function writeMsg(fullMessage: string, handler: (message?: any, ...optionalParams: any[]) => void): void {
    if (isInBrowser) {
        if (supportStyle) {
            let [msg, styles] = convertMsgToConsole(fullMessage);
            handler(msg, ...styles);
        } else {
            handler(fullMessage.clearColurful());
        }
    } else {
        handler(fullMessage);
    }
}


