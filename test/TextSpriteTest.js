"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const Color_ts_1 = require("../src/Color.ts");
const FontFamily_ts_1 = require("../src/FontFamily.ts");
const TextSprite_ts_1 = require("../src/TextSprite.ts");
let text;
// no args constructor
new TextSprite_ts_1.TextSprite();
// all args constructor
text = new TextSprite_ts_1.TextSprite("whatever");
// setFontColor
text.setFontColor(Color_ts_1.Color.Black);
assert_1.default.strictEqual(text.fontColor, Color_ts_1.Color.Black);
// setFontFamily
text.setFontFamily(FontFamily_ts_1.FontFamily.Serif);
assert_1.default.strictEqual(text.fontFamily, FontFamily_ts_1.FontFamily.Serif);
// setText
text.setText("test");
// getString
assert_1.default.strictEqual(text.text, "test");
//# sourceMappingURL=TextSpriteTest.js.map