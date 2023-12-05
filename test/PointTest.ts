"use strict";

import assert from "assert";

import { Point } from "../src/Point.ts";

let subject;

// no args constructor
subject = new Point();
assert.strictEqual(subject.x, 0);
assert.strictEqual(subject.y, 0);

// all args constructor
subject = new Point(1, 2);
assert.strictEqual(subject.x, 1);
assert.strictEqual(subject.y, 2);

// setters
assert.strictEqual(subject.setX(8), subject);
assert.strictEqual(subject.x, 8);
assert.strictEqual(subject.setY(9), subject);
assert.strictEqual(subject.y, 9);
