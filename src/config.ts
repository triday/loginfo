import "./types";
import "tsharp";
const DEFAULT_LOGINFO: ILogOptions = {
    styles: [],
    format: function (text, type) {
        let prefix = String.format("{0:HH:mm:ss} {1,7}", new Date(), `[${type.toUpperCase()}]`)
        return `${prefix} ${text}`;
    }
}
const AllSettings: { [key: string]: ILogOptions } = {

}

export function GetConfig(type: LOG_TYPE): ILogOptions {
    return AllSettings[type];
}


export function SetConfig(options: { [key: string]: ILogOptions }): void {
    Object.keys(options).forEach(p => {
        AllSettings[p] = Object.merge({}, DEFAULT_LOGINFO, options[p]);
    });
}


(function () {
    SetConfig({
        debug: {
            fore: "green",
        },
        info: {
            fore: "white",
        },
        warn: {
            fore: "yellow",
        },
        error: {
            fore: "red",
        },
        fatal: {
            fore: "red",
            styles:["inverse"]
        }
    })

})();