"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const Point_ts_1 = require("../src/Point.ts");
let subject;
// no args constructor
subject = new Point_ts_1.Point();
assert_1.default.strictEqual(subject.x, 0);
assert_1.default.strictEqual(subject.y, 0);
// all args constructor
subject = new Point_ts_1.Point(1, 2);
assert_1.default.strictEqual(subject.x, 1);
assert_1.default.strictEqual(subject.y, 2);
// setters
assert_1.default.strictEqual(subject.setX(8), subject);
assert_1.default.strictEqual(subject.x, 8);
assert_1.default.strictEqual(subject.setY(9), subject);
assert_1.default.strictEqual(subject.y, 9);
