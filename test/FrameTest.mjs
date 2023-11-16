"use strict";

import assert from "assert";

import { Frame } from "../src/Frame.mjs";

const IMAGE = {
	width: 1,
	height: 2,
};

let subject;

// constructor
subject = new Frame(IMAGE, 1);
assert.strictEqual(subject.image, IMAGE);
assert.strictEqual(subject.duration, 1);
assert.strictEqual(subject.width, IMAGE.width);
assert.strictEqual(subject.height, IMAGE.height);
