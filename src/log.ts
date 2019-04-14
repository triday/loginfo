import { convertMsgToConsole } from './msg_convert'
import { LOG_TYPE, LogLevel, ALL_CONFIG, useLogStyle } from './config';
import { isInBroswer, supportBroswerStyle } from './env';
/**
 * 输出 debug 级别的消息。
 * @param message 要输出的消息，可以携带格式化参数。
 * @param args 消息的格式化参数。参考 String.format 格式化
 */
export function debug(message: string, ...args: any[]): void {
    if (LogLevel.debug >= ALL_CONFIG.level) {
        let msg = buildMsg("debug", message, ...args);
        writeMsg(msg, console.log);
    }

}
/**
 * 输出 info 级别的消息。
 * @param message 要输出的消息，可以携带格式化参数，参考 String.format 格式化。
 * @param args 消息的格式化参数
 */
export function info(message: string, ...args: any[]): void {
    if (LogLevel.info >= ALL_CONFIG.level) {
        let msg = buildMsg("info", message, ...args);
        writeMsg(msg, console.log);
    }
}
/**
 * 输出 warn 级别的消息。
 * @param message 要输出的消息，可以携带格式化参数，参考 String.format 格式化。
 * @param args 消息的格式化参数
 */
export function warn(message: string, ...args: any[]): void {
    if (LogLevel.warn >= ALL_CONFIG.level) {
        let msg = buildMsg("warn", message, ...args);
        writeMsg(msg, console.log);
    }
}
/**
 * 输出 error 级别的消息。
 * @param message 要输出的消息，可以携带格式化参数，参考 String.format 格式化。
 * @param args 消息的格式化参数
 */
export function error(message: string, ...args: any[]): void {
    if (LogLevel.error >= ALL_CONFIG.level) {
        let msg = buildMsg("error", message, ...args);
        writeMsg(msg, console.log);
    }
}
/**
 * 输出 fatal 级别的消息。
 * @param message 要输出的消息，可以携带格式化参数，参考 String.format 格式化。
 * @param args 消息的格式化参数
 */
export function fatal(message: string, ...args: any[]): void {
    if (LogLevel.fatal >= ALL_CONFIG.level) {
        let msg = buildMsg("fatal", message, ...args);
        writeMsg(msg, console.log);
    }
}
/**
 * 输出一个空行。
 */
export function empty(): void {
    console.log('');
}

/**
 * 输出一条分割线
 * @param message 
 */
export function spliter(line:string=""):void{
    console.log(line);
}

export function buildMsg(type: LOG_TYPE, message: string, ...args: any[]): string {
    let lineText = String.format(message, ...args);
    let setting = ALL_CONFIG.styles[type] || {};
    let prefiexText = '';
    if (typeof ALL_CONFIG.prefiex === "string") {
        prefiexText = ALL_CONFIG.prefiex;
    } else if (typeof ALL_CONFIG.prefiex === "function") {
        prefiexText = ALL_CONFIG.prefiex(type, setting);
    }
    return `${prefiexText}${useLogStyle(lineText, setting)}`;
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


