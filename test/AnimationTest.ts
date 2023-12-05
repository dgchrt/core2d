"use strict";

import assert from "assert";

import { Animation } from "../src/Animation.ts";
import { Frame } from "../src/Frame.ts";

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
  new Frame(IMAGE1, 1),
  new Frame(IMAGE2, 2),
];

// constructor
subject = new Animation(FRAMES);
assert.strictEqual(subject.image, IMAGE1);
assert.strictEqual(subject.width, IMAGE1.width);
assert.strictEqual(subject.height, IMAGE1.height);
assert.strictEqual(subject.sync(), false);
assert.strictEqual(subject.image, IMAGE2);
assert.strictEqual(subject.width, IMAGE2.width);
assert.strictEqual(subject.height, IMAGE2.height);
assert.strictEqual(subject.sync(), false);
assert.strictEqual(subject.image, IMAGE2);
assert.strictEqual(subject.width, IMAGE2.width);
assert.strictEqual(subject.height, IMAGE2.height);
assert.strictEqual(subject.sync(), true);
assert.strictEqual(subject.image, IMAGE1);
assert.strictEqual(subject.width, IMAGE1.width);
assert.strictEqual(subject.height, IMAGE1.height);
assert.strictEqual(subject.sync(), false);
assert.strictEqual(subject.image, IMAGE2);
assert.strictEqual(subject.width, IMAGE2.width);
assert.strictEqual(subject.height, IMAGE2.height);
assert.strictEqual(subject.sync(), false);
assert.strictEqual(subject.image, IMAGE2);
assert.strictEqual(subject.width, IMAGE2.width);
assert.strictEqual(subject.height, IMAGE2.height);
assert.strictEqual(subject.sync(), true);
assert.strictEqual(subject.image, IMAGE1);
assert.strictEqual(subject.width, IMAGE1.width);
assert.strictEqual(subject.height, IMAGE1.height);

// factories
subject = Animation.fromImages([IMAGE1, IMAGE2], 2);
assert.strictEqual(subject.image, IMAGE1);
assert.strictEqual(subject.width, IMAGE1.width);
assert.strictEqual(subject.height, IMAGE1.height);
assert.strictEqual(subject.sync(), false);
assert.strictEqual(subject.image, IMAGE1);
assert.strictEqual(subject.width, IMAGE1.width);
assert.strictEqual(subject.height, IMAGE1.height);
assert.strictEqual(subject.sync(), false);
assert.strictEqual(subject.image, IMAGE2);
assert.strictEqual(subject.width, IMAGE2.width);
assert.strictEqual(subject.height, IMAGE2.height);
assert.strictEqual(subject.sync(), false);
assert.strictEqual(subject.image, IMAGE2);
assert.strictEqual(subject.width, IMAGE2.width);
assert.strictEqual(subject.height, IMAGE2.height);
assert.strictEqual(subject.sync(), true);
assert.strictEqual(subject.image, IMAGE1);
assert.strictEqual(subject.width, IMAGE1.width);
assert.strictEqual(subject.height, IMAGE1.height);
assert.strictEqual(subject.sync(), false);
assert.strictEqual(subject.image, IMAGE1);
assert.strictEqual(subject.width, IMAGE1.width);
assert.strictEqual(subject.height, IMAGE1.height);
assert.strictEqual(subject.sync(), false);
assert.strictEqual(subject.image, IMAGE2);
assert.strictEqual(subject.width, IMAGE2.width);
assert.strictEqual(subject.height, IMAGE2.height);
assert.strictEqual(subject.sync(), false);
assert.strictEqual(subject.image, IMAGE2);
assert.strictEqual(subject.width, IMAGE2.width);
assert.strictEqual(subject.height, IMAGE2.height);
assert.strictEqual(subject.sync(), true);
assert.strictEqual(subject.image, IMAGE1);
assert.strictEqual(subject.width, IMAGE1.width);
assert.strictEqual(subject.height, IMAGE1.height);
