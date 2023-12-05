"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const Animation_ts_1 = require("../src/Animation.ts");
const Frame_ts_1 = require("../src/Frame.ts");
let subject;
const IMAGE1 = {
    width: 1,
    height: 2,
};
const IMAGE2 = {
    width: 3,
    height: 4,
};
const FRAMES = [
    new Frame_ts_1.Frame(IMAGE1, 1),
    new Frame_ts_1.Frame(IMAGE2, 2),
];
// constructor
subject = new Animation_ts_1.Animation(FRAMES);
assert_1.default.strictEqual(subject.image, IMAGE1);
assert_1.default.strictEqual(subject.width, IMAGE1.width);
assert_1.default.strictEqual(subject.height, IMAGE1.height);
assert_1.default.strictEqual(subject.sync(), false);
assert_1.default.strictEqual(subject.image, IMAGE2);
assert_1.default.strictEqual(subject.width, IMAGE2.width);
assert_1.default.strictEqual(subject.height, IMAGE2.height);
assert_1.default.strictEqual(subject.sync(), false);
assert_1.default.strictEqual(subject.image, IMAGE2);
assert_1.default.strictEqual(subject.width, IMAGE2.width);
assert_1.default.strictEqual(subject.height, IMAGE2.height);
assert_1.default.strictEqual(subject.sync(), true);
assert_1.default.strictEqual(subject.image, IMAGE1);
assert_1.default.strictEqual(subject.width, IMAGE1.width);
assert_1.default.strictEqual(subject.height, IMAGE1.height);
assert_1.default.strictEqual(subject.sync(), false);
assert_1.default.strictEqual(subject.image, IMAGE2);
assert_1.default.strictEqual(subject.width, IMAGE2.width);
assert_1.default.strictEqual(subject.height, IMAGE2.height);
assert_1.default.strictEqual(subject.sync(), false);
assert_1.default.strictEqual(subject.image, IMAGE2);
assert_1.default.strictEqual(subject.width, IMAGE2.width);
assert_1.default.strictEqual(subject.height, IMAGE2.height);
assert_1.default.strictEqual(subject.sync(), true);
assert_1.default.strictEqual(subject.image, IMAGE1);
assert_1.default.strictEqual(subject.width, IMAGE1.width);
assert_1.default.strictEqual(subject.height, IMAGE1.height);
// factories
subject = Animation_ts_1.Animation.fromImages([IMAGE1, IMAGE2], 2);
assert_1.default.strictEqual(subject.image, IMAGE1);
assert_1.default.strictEqual(subject.width, IMAGE1.width);
assert_1.default.strictEqual(subject.height, IMAGE1.height);
assert_1.default.strictEqual(subject.sync(), false);
assert_1.default.strictEqual(subject.image, IMAGE1);
assert_1.default.strictEqual(subject.width, IMAGE1.width);
assert_1.default.strictEqual(subject.height, IMAGE1.height);
assert_1.default.strictEqual(subject.sync(), false);
assert_1.default.strictEqual(subject.image, IMAGE2);
assert_1.default.strictEqual(subject.width, IMAGE2.width);
assert_1.default.strictEqual(subject.height, IMAGE2.height);
assert_1.default.strictEqual(subject.sync(), false);
assert_1.default.strictEqual(subject.image, IMAGE2);
assert_1.default.strictEqual(subject.width, IMAGE2.width);
assert_1.default.strictEqual(subject.height, IMAGE2.height);
assert_1.default.strictEqual(subject.sync(), true);
assert_1.default.strictEqual(subject.image, IMAGE1);
assert_1.default.strictEqual(subject.width, IMAGE1.width);
assert_1.default.strictEqual(subject.height, IMAGE1.height);
assert_1.default.strictEqual(subject.sync(), false);
assert_1.default.strictEqual(subject.image, IMAGE1);
assert_1.default.strictEqual(subject.width, IMAGE1.width);
assert_1.default.strictEqual(subject.height, IMAGE1.height);
assert_1.default.strictEqual(subject.sync(), false);
assert_1.default.strictEqual(subject.image, IMAGE2);
assert_1.default.strictEqual(subject.width, IMAGE2.width);
assert_1.default.strictEqual(subject.height, IMAGE2.height);
assert_1.default.strictEqual(subject.sync(), false);
assert_1.default.strictEqual(subject.image, IMAGE2);
assert_1.default.strictEqual(subject.width, IMAGE2.width);
assert_1.default.strictEqual(subject.height, IMAGE2.height);
assert_1.default.strictEqual(subject.sync(), true);
assert_1.default.strictEqual(subject.image, IMAGE1);
assert_1.default.strictEqual(subject.width, IMAGE1.width);
assert_1.default.strictEqual(subject.height, IMAGE1.height);
