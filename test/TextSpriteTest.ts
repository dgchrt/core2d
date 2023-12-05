"use strict";

import assert from "assert";

import { Color } from "../src/Color.ts";
import { FontFamily } from "../src/FontFamily.ts";
import { TextSprite } from "../src/TextSprite.ts";

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
