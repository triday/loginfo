const { default: log, config } = require("../../dist/index");

function write() {
    log.empty();
    log.info("This is a info message!");
    log.debug("This is a debug message!");
    log.warn("This is a warn message!");
    log.error("This is a error message!");
    log.fatal("This is a fatal message!");
    log.empty();
}

console.log("====before setLevel====");
write();

console.log(String.format("====after set level {0#red}====", "debug(0)"));
config({ level: 0 });
write();

console.log(String.format("====after set level {0#red}====", "info(1)"));
config({ level: 1 });
write();

console.log(String.format("====after set level {0#red}====", "warn(2)"));
config({ level: 2 });
write();

console.log(String.format("====after set level {0#red}====", "error(3)"));
config({ level: 3 });
write();

console.log(String.format("====after set level {0#red}====", "fatal(4)"));
config({ level: 4 });
write();

console.log(String.format("====after set level {0#red}====", "none(99)"));
config({ level: 99 });
write();