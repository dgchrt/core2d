"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const FontSprite_ts_1 = require("../../src/plugin/FontSprite.ts");
let text;
// no args constructor
new FontSprite_ts_1.FontSprite();
// all args constructor
text = new FontSprite_ts_1.FontSprite("whatever");
// setText
text.setText("test");
// getString
assert_1.default.strictEqual(text.text, "test");
//# sourceMappingURL=FontSpriteTest.js.map