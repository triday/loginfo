import "mocha";
import * as assert from "assert";
import {convertMsgToConsole} from "../src/msg_convert";
describe("msgconv",function(){
    it("test",function(){
        let msg="adafsd\x1B[43masdf\x1B[34m\x1B[49msdf\x1B[49m";
        let [messages,styles]= convertMsgToConsole(msg);
        let expected="adafsd%casdf%c%csdf%c"
        assert.equal(messages, expected);
    });
})