import readline from 'readline';
import { info, buildMsg } from './log';

const isWindow = () => typeof window !== "undefined";
const isInProcess = () => typeof process !== "undefined";
const supportTick = !isWindow() && isInProcess()

export function beginTick(): void {
    if (supportTick) {
        process.stdout.write('\x1B7');//store current cursor position
    }
}

export function tick(message: string, ...args: any[]) {
    if (supportTick) {
        process.stdout.cork();
        process.stdout.write('\x1B8');//restore cussor position
        readline.clearScreenDown(process.stdout);
        process.stdout.write(buildMsg("info", message, ...args));
        process.stdout.uncork();
    } else {
        info(message, ...args);
    }
}

export function endTick(): void {
    if (supportTick) {
        process.stdout.write('\n');
    }
}