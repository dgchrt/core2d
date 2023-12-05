"use strict";

import assert from "assert";

import { FontSprite } from "../../src/plugin/FontSprite.ts";

let text;

// no args constructor
new FontSprite();

// all args constructor
text = new FontSprite("whatever");

// setText
text.setText("test");

// getString
assert.strictEqual(text.text, "test");
