import "tsharp";

export const BrowserCodeColorMap: { [key: number]: string } = {
    30:"rgb(0,0,0)",
    31:"rgb(194,54,33)",
    32:"rgb(37,188,36)",
    33:"rgb(173,173,39)",
    34:"rgb(73,46,225)",
    35:"rgb(211,56,211)",
    36:"rgb(51,187,200)",
    37:"rgb(203,204,205)",
    90:"rgb(129,131,131)",
    91:"rgb(252,57,31)",
    92:"rgb(49,231,34)",
    93:"rgb(234,236,35)",
    94:"rgb(88,51,255)",
    95:"rgb(249,53,248)",
    96:"rgb(20,240,240)",
    97:"rgb(235,235,235)",

    40:"rgb(0,0,0)",
    41:"rgb(194,54,33)",
    42:"rgb(37,188,36)",
    43:"rgb(173,173,39)",
    44:"rgb(73,46,225)",
    45:"rgb(211,56,211)",
    46:"rgb(51,187,200)",
    47:"rgb(203,204,205)",
    100:"rgb(129,131,131)",
    101:"rgb(252,57,31)",
    102:"rgb(49,231,34)",
    103:"rgb(234,236,35)",
    104:"rgb(88,51,255)",
    105:"rgb(249,53,248)",
    106:"rgb(20,240,240)",
    107:"rgb(235,235,235)"
}

export const BrowserDefaultStyle: { [key: string]: string } = {
    'font-size': '1.5em'
}

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

    function pushIntoCurrent(code: number) {
        if (code >= 30 && code <= 37) {
            currentStyle.color = BrowserCodeColorMap[code];
        } else if (code == 39) {
            currentStyle.color = ''
        } else if (code >= 40 && code <= 47) {
            currentStyle.bkColor = BrowserCodeColorMap[code]
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
        let style = Object.extend({}, BrowserDefaultStyle) as { [key: string]: string };
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