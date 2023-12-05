"use strict";

import assert from "assert";

import { Point } from "../src/Point.ts";
import { Rect } from "../src/Rect.ts";

let subject;

// no args constructor
subject = new Rect();
assert.strictEqual(subject.x, 0);
assert.strictEqual(subject.y, 0);
assert.strictEqual(subject.width, 0);
assert.strictEqual(subject.height, 0);

// all args constructor
subject = new Rect(1, 2, 3, 4);
assert.strictEqual(subject.x, 1);
assert.strictEqual(subject.y, 2);
assert.strictEqual(subject.width, 3);
assert.strictEqual(subject.height, 4);

// setters
assert.strictEqual(subject.setWidth(7), subject);
assert.strictEqual(subject.width, 7);

assert.strictEqual(subject.setHeight(8), subject);
assert.strictEqual(subject.height, 8);

assert.strictEqual(subject.setHeight(9), subject);
assert.strictEqual(subject.height, 9);

assert.strictEqual(subject.setLeft(17), subject);
assert.strictEqual(subject.left, 17);

subject.left = 16;
assert.strictEqual(subject.left, 16);

assert.strictEqual(subject.setRight(18), subject);
assert.strictEqual(subject.right, 18);

subject.right = 17;
assert.strictEqual(subject.right, 17);

assert.strictEqual(subject.setTop(19), subject);
assert.strictEqual(subject.top, 19);

subject.top = 18;
assert.strictEqual(subject.top, 18);

assert.strictEqual(subject.setBottom(11), subject);
assert.strictEqual(subject.bottom, 11);

subject.bottom = 10;
assert.strictEqual(subject.bottom, 10);

assert.strictEqual(subject.setCenterX(14), subject);
assert.strictEqual(subject.centerX, 14);

subject.centerX = 13;
assert.strictEqual(subject.centerX, 13);

subject.setCenterY(15);
assert.strictEqual(subject.centerY, 15);

subject.centerY = 14;
assert.strictEqual(subject.centerY, 14);

assert.strictEqual(subject.setCenter(new Point().setX(12).setY(13)), subject);
assert.strictEqual(subject.center.x, 12);
assert.strictEqual(subject.center.y, 13);

subject.center = new Point().setX(11).setY(12);
assert.strictEqual(subject.center.x, 11);
assert.strictEqual(subject.center.y, 12);

// metrics
subject = new Rect().setX(0).setY(0).setWidth(1).setHeight(1);
assert.strictEqual(subject.right, 0);
assert.strictEqual(subject.bottom, 0);

subject = new Rect().setX(0).setY(0).setWidth(2).setHeight(2);
assert.strictEqual(subject.right, 1);
assert.strictEqual(subject.bottom, 1);

subject = new Rect().setX(0).setY(0).setWidth(3).setHeight(3);
assert.strictEqual(subject.right, 2);
assert.strictEqual(subject.bottom, 2);

subject = new Rect().setX(0).setY(0).setWidth(4).setHeight(4);
assert.strictEqual(subject.right, 3);
assert.strictEqual(subject.bottom, 3);

subject.setRight(subject.right);
subject.setBottom(subject.bottom);
assert.strictEqual(subject.x, 0);
assert.strictEqual(subject.y, 0);

subject = new Rect().setX(0).setY(0).setWidth(5).setHeight(5);
assert.strictEqual(subject.centerX, 2);
assert.strictEqual(subject.centerY, 2);

subject = new Rect().setX(0).setY(0).setWidth(6).setHeight(6);
assert.strictEqual(subject.centerX, 3);
assert.strictEqual(subject.centerY, 3);

// union
const RECT1 = new Rect().setX(10).setY(20).setWidth(30).setHeight(40);
const RECT2 = new Rect().setX(50).setY(60).setWidth(70).setHeight(80);
subject = RECT1.makeUnion(RECT2);
assert.strictEqual(subject.left, RECT1.left);
assert.strictEqual(subject.top, RECT1.top);
assert.strictEqual(subject.right, RECT2.right);
assert.strictEqual(subject.bottom, RECT2.bottom);
