"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
global.document = {};
global.window = {
    document,
};
const Command_ts_1 = require("../src/Command.ts");
const Core2D_ts_1 = require("../src/Core2D.ts");
let controller;
// mock
const deviceMock = {
    commands: (() => {
        let result = {};
        for (let key in Command_ts_1.Command) {
            result[Command_ts_1.Command[key]] = true;
        }
        return result;
    })()
};
// no args constructor
controller = Core2D_ts_1.Core2D.getController();
for (let i in Command_ts_1.Command) {
    let value = Command_ts_1.Command[i];
    assert_1.default.strictEqual(controller.keyDown(value), undefined);
    assert_1.default.strictEqual(controller.keyPush(value), undefined);
}
// with all commands, first update
controller.setDevice(deviceMock);
assert_1.default.strictEqual(controller.update(), undefined);
for (let j in Command_ts_1.Command) {
    assert_1.default.strictEqual(controller.keyDown(Command_ts_1.Command[j]), true);
    assert_1.default.strictEqual(controller.keyPush(Command_ts_1.Command[j]), true);
}
// with all commands, second update
assert_1.default.strictEqual(controller.update(), undefined);
for (let k in Command_ts_1.Command) {
    assert_1.default.strictEqual(controller.keyDown(Command_ts_1.Command[k]), true);
    assert_1.default.strictEqual(controller.keyPush(Command_ts_1.Command[k]), false);
}
//# sourceMappingURL=ControllerTest.js.map