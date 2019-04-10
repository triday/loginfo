"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var assert = __importStar(require("assert"));
var msg_convert_1 = require("../src/msg_convert");
describe("msgconv", function () {
    it("test", function () {
        var msg = "adafsd\x1B[43masdf\x1B[34m\x1B[49msdf\x1B[49m";
        var _a = msg_convert_1.convertMsgToConsole(msg), messages = _a[0], styles = _a[1];
        assert.equal("", "");
    });
});
