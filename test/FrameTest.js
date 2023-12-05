"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const Frame_ts_1 = require("../src/Frame.ts");
const IMAGE = {
    width: 1,
    height: 2,
};
let subject;
// constructor
subject = new Frame_ts_1.Frame(IMAGE, 1);
assert_1.default.strictEqual(subject.image, IMAGE);
assert_1.default.strictEqual(subject.duration, 1);
assert_1.default.strictEqual(subject.width, IMAGE.width);
assert_1.default.strictEqual(subject.height, IMAGE.height);
//# sourceMappingURL=FrameTest.js.map