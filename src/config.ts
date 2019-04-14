import "tsharp";

export type LOG_TYPE = "debug" | "info" | "warn" | "error" | "fatal";

export const enum LogLevel {
    debug = 0,
    info = 1,
    warn = 2,
    error = 3,
    fatal = 4,
    none = 99
}

interface LogStyle {
    fore?: ForeColor,
    back?: BackColor,
    styles?: TextStyle[]
}
interface ConfigOption {
    /**
     * log的级别，none<debug<info<warn<error<fatal<all
     */
    level: LogLevel,
    /**
     * log的前缀
     */
    prefiex: string | ((type: LOG_TYPE, logSetting: LogStyle) => string) | null,
    /**
     * log的样式
     */
    styles: { [key: string]: LogStyle },

    /**
     * log的颜色映射表
     */
    browserColorMap: { [key: number]: string },
    /**
     * log初始的样式
     */
    browserInitStyle: { [key: string]: string }
}
export function useLogStyle(text: string, setting: LogStyle): string {
    let styles: (ForeColor | BackColor | TextStyle)[] = setting.styles || [];
    if (typeof setting.fore !== "undefined") styles.push(setting.fore);
    if (typeof setting.back !== "undefined") styles.push(setting.back);
    return text.toColorful(...styles);
}
export const ALL_CONFIG: ConfigOption = {
    level: LogLevel.debug,
    prefiex: function (type, setting) {
        let timeStamp = String.format("{0:HH:mm:ss.fff}", new Date());
        //let typeText = String.format("[{0,5:upper}]", useLogStyle(type, setting));
        let typeText = String.format("[{0,5:upper}]", type);
        return `${timeStamp} ${typeText} `.toColorful("blackBright");
    },
    styles: {
        debug: {
            fore: "green",
        },
        info: {
        },
        warn: {
            fore: "yellow",
        },
        error: {
            fore: "red",
        },
        fatal: {
            fore: "black",
            back: "bgRed"
        }
    },
    browserColorMap: {
        30: "rgb(0,0,0)",
        31: "rgb(194,54,33)",
        32: "rgb(37,188,36)",
        33: "rgb(173,173,39)",
        34: "rgb(73,46,225)",
        35: "rgb(211,56,211)",
        36: "rgb(51,187,200)",
        37: "rgb(203,204,205)",
        90: "rgb(129,131,131)",
        91: "rgb(252,57,31)",
        92: "rgb(49,231,34)",
        93: "rgb(234,236,35)",
        94: "rgb(88,51,255)",
        95: "rgb(249,53,248)",
        96: "rgb(20,240,240)",
        97: "rgb(235,235,235)",

        40: "rgb(0,0,0)",
        41: "rgb(194,54,33)",
        42: "rgb(37,188,36)",
        43: "rgb(173,173,39)",
        44: "rgb(73,46,225)",
        45: "rgb(211,56,211)",
        46: "rgb(51,187,200)",
        47: "rgb(203,204,205)",
        100: "rgb(129,131,131)",
        101: "rgb(252,57,31)",
        102: "rgb(49,231,34)",
        103: "rgb(234,236,35)",
        104: "rgb(88,51,255)",
        105: "rgb(249,53,248)",
        106: "rgb(20,240,240)",
        107: "rgb(235,235,235)"
    },
    browserInitStyle: {
        'font-size': '1.5em'
    }
}
export function config<K extends keyof ConfigOption>(option: Pick<ConfigOption, K>): void {
    if (option) {
        Object.extend(ALL_CONFIG, option);
    }
}