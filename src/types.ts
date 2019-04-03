type LOG_TYPE = "debug" | "info" | "warn" | "error" | "fatal";



interface ILogOptions {
    fore?: ForeColor,
    back?: BackColor,
    styles?: TextStyle[],
    format?(text: string, type: string): string
}