import { convertMsgToConsole } from './msg_convert'
import { LOG_TYPE, GetConfig, GetLogPrefiex } from './config';
import { isInBroswer, supportBroswerStyle } from './env';
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
    writeMsg(msg, console.log);
}
/**
 * 输出 error 级别的消息。
 * @param message 要输出的消息，可以携带格式化参数，参考 String.format 格式化。
 * @param args 消息的格式化参数
 */
export function error(message: string, ...args: any[]): void {
    let msg = buildMsg("error", message, ...args);
    writeMsg(msg, console.log);
}
/**
 * 输出 fatal 级别的消息。
 * @param message 要输出的消息，可以携带格式化参数，参考 String.format 格式化。
 * @param args 消息的格式化参数
 */
export function fatal(message: string, ...args: any[]): void {
    let msg = buildMsg("fatal", message, ...args);
    writeMsg(msg, console.log);
}
/**
 * 输出一个空行。
 */
export function empty():void{
    console.log('');
}

export function buildMsg(type: LOG_TYPE, message: string, ...args: any[]): string {
    let lineText = String.format(message, ...args);
    let setting = GetConfig(type);
    let prefiexText = GetLogPrefiex(type,setting);
    let allStyles: (ForeColor | BackColor | TextStyle)[] = setting.styles || [];
    if (typeof setting.fore !== "undefined") {
        allStyles.push(setting.fore);
    }
    if (typeof setting.back !== "undefined") {
        allStyles.push(setting.back);
    }
    if (setting.fore) allStyles.push(setting.fore)
    return `${prefiexText}${lineText.toColorful(...allStyles)}`;
}

function writeMsg(fullMessage: string, handler: (message?: any, ...optionalParams: any[]) => void): void {
    if (isInBroswer) {
        if (supportBroswerStyle) {
            let [msg, styles] = convertMsgToConsole(fullMessage);
            handler(msg, ...styles);
        } else {
            handler(fullMessage.clearColurful());
        }
    } else {
        handler(fullMessage);
    }
}


