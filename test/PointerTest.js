"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const Core2D_ts_1 = require("../src/Core2D.ts");
let pointer;
// mock
const deviceMock = {
    command: true,
    x: 100,
    y: 200,
};
// without device
pointer = Core2D_ts_1.Core2D.getPointer();
pointer.update();
assert_1.default.strictEqual(pointer.x, 0);
assert_1.default.strictEqual(pointer.y, 0);
assert_1.default.strictEqual(pointer.down, false);
// with device
pointer.setDevice(deviceMock);
pointer.update();
assert_1.default.strictEqual(pointer.x, 100);
assert_1.default.strictEqual(pointer.y, 200);
assert_1.default.strictEqual(pointer.down, true);
//# sourceMappingURL=PointerTest.js.map