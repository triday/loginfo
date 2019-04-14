import { empty, info, debug, warn, error, fatal } from './log';
import { beginTick, endTick, tick } from './tick';

export * from './config';
export * from './tick_chars';

export default {
    empty,
    info,
    debug,
    warn,
    error,
    fatal,
    beginTick,
    tick,
    endTick
}
