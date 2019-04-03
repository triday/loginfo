import "./types";
import "tsharp";
import { GetConfig } from "./config";
/**
 * 输出 debug 级别的消息。
 * @param message 要输出的消息，可以携带格式化参数。
 * @param args 消息的格式化参数。参考 String.format 格式化
 */
function debug(message: string, ...args: any[]): void {
    LOG("debug", message, ...args);
}
/**
 * 输出 info 级别的消息。
 * @param message 要输出的消息，可以携带格式化参数，参考 String.format 格式化。
 * @param args 消息的格式化参数
 */
function info(message: string, ...args: any[]): void {
    LOG("info", message, ...args);
}
/**
 * 输出 warn 级别的消息。
 * @param message 要输出的消息，可以携带格式化参数，参考 String.format 格式化。
 * @param args 消息的格式化参数
 */
function warn(message: string, ...args: any[]): void {
    LOG("warn", message, ...args);
}
/**
 * 输出 error 级别的消息。
 * @param message 要输出的消息，可以携带格式化参数，参考 String.format 格式化。
 * @param args 消息的格式化参数
 */
function error(message: string, ...args: any[]): void {
    LOG("error", message, ...args);
}
/**
 * 输出 fatal 级别的消息。
 * @param message 要输出的消息，可以携带格式化参数，参考 String.format 格式化。
 * @param args 消息的格式化参数
 */
function fatal(message: string, ...args: any[]): void {
    LOG("fatal", message, ...args);
}
function LOG(type: LOG_TYPE, message: string, ...args: any[]): void {
    let lineText = String.format(message, ...args);
    let setting = GetConfig(type);
    let formatLineText=setting.format?setting.format(lineText,type):lineText;
    let colorfulText = formatLineText.toColorful(setting.fore,setting.back,...setting.styles);
    console.log(colorfulText);
}

export default {
    debug,
    info,
    warn,
    error,
    fatal
}