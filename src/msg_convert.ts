import "tsharp";
import {ALL_CONFIG} from './config';



export function convertMsgToConsole(msg: string): [string, string[]] {
    let styles: string[] = [];
    const currentStyle = {
        bold: false,
        italic: false,
        underline: false,
        lineThrough: false,
        inverse: false,
        color: '',
        bkColor: ''
    }
    let colorMap=ALL_CONFIG.browserColorMap;
    function pushIntoCurrent(code: number) {
        if (code >= 30 && code <= 37) {
            currentStyle.color = colorMap[code];
        } else if (code == 39) {
            currentStyle.color = ''
        } else if (code >= 40 && code <= 47) {
            currentStyle.bkColor = colorMap[code]
        } else if (code == 49) {
            currentStyle.bkColor = ''
        } else if (code === 1) {
            currentStyle.bold = true;
        } else if (code == 22) {
            currentStyle.bold = false;
        } else if (code == 3) {
            currentStyle.italic = true;
        } else if (code == 23) {
            currentStyle.italic = false;
        } else if (code == 4) {
            currentStyle.underline = true;
        } else if (code == 24) {
            currentStyle.underline = false;
        } else if (code == 7) {
            currentStyle.inverse = true;
        } else if (code == 27) {
            currentStyle.inverse = false;
        } else if (code == 9) {
            currentStyle.lineThrough = true;
        } else if (code == 29) {
            currentStyle.lineThrough = false;
        }
    }
    function stringfyStyle(): string {
        let style = Object.extend({}, ALL_CONFIG.browserInitStyle) as { [key: string]: string };
        if (currentStyle.bold) {
            style['font-weight'] = 'bold';
        }
        if (currentStyle.italic) {
            style['font-style'] = 'italic';
        }
        if (currentStyle.underline) {
            style['text-decoration'] = 'underline';
        }
        if (currentStyle.lineThrough) {
            style['text-decoration'] = 'line-through';
        }
        if (currentStyle.color) {
            if (currentStyle.inverse) {
                style['background'] = currentStyle.color;
            } else {
                style['color'] = currentStyle.color;
            }
        }
        if (currentStyle.bkColor) {
            if (currentStyle.inverse) {
                style['color'] = currentStyle.bkColor;
            } else {
                style['background'] = currentStyle.bkColor;
            }
        }
        return Object.keys(style).map(p => `${p}:${style[p]}`).join(';');
    }
    let replacedText = (msg || '').replace("%","%%").replace(/\x1B\[(\d+)m/g, (substring: string, ansiCode: string) => {
        let code = Number(ansiCode);
        pushIntoCurrent(code);
        styles.push(stringfyStyle())
        return '%c';
    })

    return [replacedText, styles];
}