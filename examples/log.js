require("tsharp");
const log = require("../dist/index");

Array.range(3).forEach(()=>{
    log.info("This is a info message!");
    log.debug("This is a debug message!");
    log.warn("This is a warn message!");
    log.error("This is a error message!");
    log.fatal("This is a fatal message!");
    log.empty();
});
