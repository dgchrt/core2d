"use strict";

import assert from "assert";

import { Color } from "../src/Color.mjs";
import { FontFamily } from "../src/FontFamily.mjs";
import { TextSprite } from "../src/TextSprite.mjs";

let text;

// no args constructor
new TextSprite();

// all args constructor
text = new TextSprite("whatever");

// setFontColor
text.setFontColor(Color.Black);
assert.strictEqual(text.fontColor, Color.Black);

// setFontFamily
text.setFontFamily(FontFamily.Serif);
assert.strictEqual(text.fontFamily, FontFamily.Serif);

// setText
text.setText("test");

// getString
assert.strictEqual(text.text, "test");
