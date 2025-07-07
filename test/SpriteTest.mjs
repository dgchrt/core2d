"use strict";

import assert from "assert";

import { Point } from "../src/Point.mjs";
import { Rect } from "../src/Rect.mjs";
import { Sprite } from "../src/Sprite.mjs";

let subject;
let offBoundaryCalled;

// no args constructor
subject = new Sprite();
assert.strictEqual(subject.accelerationX, 0);
assert.strictEqual(subject.accelerationY, 0);
assert.strictEqual(subject.boundary, null);
assert.strictEqual(subject.color, null);
assert.strictEqual(subject.essential, false);
assert.strictEqual(subject.expiration, 0);
assert.strictEqual(subject.expired, false);
assert.strictEqual(subject.layerIndex, 0);
assert.strictEqual(subject.maxSpeedX, 0);
assert.strictEqual(subject.maxSpeedY, 0);
assert.strictEqual(subject.solid, false);
assert.strictEqual(subject.speedX, 0);
assert.strictEqual(subject.speedY, 0);
assert.strictEqual(subject.visible, true);
assert.strictEqual(subject.angle, 0);
assert.strictEqual(subject.direction.left, false);
assert.strictEqual(subject.direction.right, false);
assert.strictEqual(subject.direction.top, false);
assert.strictEqual(subject.direction.bottom, false);
assert.strictEqual(subject.image, null);
assert.strictEqual(subject.tick, 0);

// setters
subject = new Sprite();
assert.strictEqual(subject.setAccelerationX(4), subject);
assert.strictEqual(subject.accelerationX, 4);
assert.strictEqual(subject.setAccelerationY(5), subject);
assert.strictEqual(subject.accelerationY, 5);
assert.strictEqual(subject.setSpeedX(6), subject);
assert.strictEqual(subject.speedX, 6);
assert.strictEqual(subject.setSpeedY(7), subject);
assert.strictEqual(subject.speedY, 7);
assert.strictEqual(subject.setPosition(new Point().setX(8).setY(9)), subject);
assert.strictEqual(subject.x, 8);
assert.strictEqual(subject.y, 9);
assert.strictEqual(subject.setX(10).setY(11), subject);
assert.strictEqual(subject.x, 10);
assert.strictEqual(subject.y, 11);
assert.strictEqual(subject.setX(0).setY(0), subject);
assert.strictEqual(subject.x, 0);
assert.strictEqual(subject.y, 0);
assert.strictEqual(
	subject.setSize(new Rect().setX(0).setY(0).setWidth(20).setHeight(21)),
	subject
);
assert.strictEqual(subject.width, 20);
assert.strictEqual(subject.height, 21);
assert.strictEqual(subject.setWidth(19).setHeight(19), subject);
assert.strictEqual(subject.width, 19);
assert.strictEqual(subject.height, 19);
assert.strictEqual(subject.setWidth(0).setHeight(0), subject);
assert.strictEqual(subject.width, 0);
assert.strictEqual(subject.height, 0);

// collision detection
let subject1 = new Sprite().setWidth(2).setHeight(2);
let subject2 = new Sprite().setX(1).setY(1).setWidth(2).setHeight(2);
let subject3 = new Sprite().setX(2).setY(2).setWidth(2).setHeight(2);
assert.strictEqual(subject1.hasCollision(subject2), true);
assert.strictEqual(subject1.hasCollision(subject3), false);
let collision = subject1.getCollision(subject2);
assert.strictEqual(collision.right, true);
assert.strictEqual(collision.bottom, true);

// on boundary
subject = new Sprite();
subject.setWidth(16).setHeight(16);
offBoundaryCalled = false;

subject.offBoundary = () => {
	offBoundaryCalled = true;
};

subject.setBoundary(new Rect().setX(0).setY(0).setWidth(200).setHeight(200));
subject.sync();
assert.strictEqual(offBoundaryCalled, false);

// off boundary
subject.setBoundary(
	new Rect().setX(20).setHeight(20).setWidth(100).setHeight(100)
);
subject.sync();
assert.strictEqual(offBoundaryCalled, true);

// expiration
subject = new Sprite().setExpiration(5);

for (let i = 0; i < 4; ++i) {
	assert.strictEqual(subject.expired, false);
	assert.strictEqual(subject.tick, i);
	assert.strictEqual(subject.sync(), false);
}

assert.strictEqual(subject.sync(), true);
assert.strictEqual(subject.expired, true);

// visibility
subject.setVisible();
assert.strictEqual(subject.visible, true);
subject.setVisible(true);
assert.strictEqual(subject.visible, true);
subject.setVisible(false);
assert.strictEqual(subject.visible, false);

// speed to angle
subject = new Sprite();
subject.setSpeedToAngle(1, 0);
assert.strictEqual(Math.round(subject.speedX), 1);
assert.strictEqual(Math.round(subject.speedY), 0);
subject.setSpeedToAngle(1, 90);
assert.strictEqual(Math.round(subject.speedX), 0);
assert.strictEqual(Math.round(subject.speedY), 1);
subject.setSpeedToAngle(1, 180);
assert.strictEqual(Math.round(subject.speedX), -1);
assert.strictEqual(Math.round(subject.speedY), 0);
subject.setSpeedToAngle(1, 270);
assert.strictEqual(Math.round(subject.speedX), -0);
assert.strictEqual(Math.round(subject.speedY), -1);

// get angle
subject = new Sprite();
assert.strictEqual(subject.angle, 0);
subject.setSpeedX(1);
subject.setSpeedY(1);
assert.strictEqual(subject.angle, 45);
subject.setSpeedX(-1);
subject.setSpeedY(1);
assert.strictEqual(subject.angle, 135);
subject.setSpeedX(-1);
subject.setSpeedY(-1);
assert.strictEqual(subject.angle, -135);
subject.setSpeedX(1);
subject.setSpeedY(-1);
assert.strictEqual(subject.angle, -45);

// speed to subject
subject1 = new Sprite();
subject2 = new Sprite().setX(100).setY(50);
subject1.setSpeedToPoint(2, subject2);
subject2.setSpeedToPoint(2, subject1);
assert.strictEqual(subject1.speedX, (100 / 150) * 2);
assert.strictEqual(subject1.speedY, (50 / 150) * 2);
assert.strictEqual(subject2.speedX, (-100 / 150) * 2);
assert.strictEqual(subject2.speedY, (-50 / 150) * 2);

// max speed
subject = new Sprite();
subject.setMaxSpeedX(2);
subject.setMaxSpeedY(4);
subject.setAccelerationX(1);
subject.setAccelerationY(2);
subject.sync();
assert.strictEqual(subject.speedX, 1);
assert.strictEqual(subject.speedY, 2);
subject.sync();
assert.strictEqual(subject.speedX, 2);
assert.strictEqual(subject.speedY, 4);
subject.sync();
assert.strictEqual(subject.speedX, 2);
assert.strictEqual(subject.speedY, 4);
subject.pause();
subject.setAccelerationX(-1);
subject.setAccelerationY(-2);
subject.sync();
assert.strictEqual(subject.speedX, -1);
assert.strictEqual(subject.speedY, -2);
subject.sync();
assert.strictEqual(subject.speedX, -2);
assert.strictEqual(subject.speedY, -4);
subject.sync();
assert.strictEqual(subject.speedX, -2);
assert.strictEqual(subject.speedY, -4);

// direction
subject = new Sprite();
assert.strictEqual(subject.direction.left, false);
assert.strictEqual(subject.direction.right, false);
assert.strictEqual(subject.direction.top, false);
assert.strictEqual(subject.direction.bottom, false);
subject.sync();
assert.strictEqual(subject.direction.left, false);
assert.strictEqual(subject.direction.right, false);
assert.strictEqual(subject.direction.top, false);
assert.strictEqual(subject.direction.bottom, false);
subject.sync();
subject.x += 1;
assert.strictEqual(subject.direction.left, false);
assert.strictEqual(subject.direction.right, true);
assert.strictEqual(subject.direction.top, false);
assert.strictEqual(subject.direction.bottom, false);
subject.sync();
subject.y += 1;
assert.strictEqual(subject.direction.left, false);
assert.strictEqual(subject.direction.right, false);
assert.strictEqual(subject.direction.top, false);
assert.strictEqual(subject.direction.bottom, true);
subject.sync();
subject.x -= 1;
assert.strictEqual(subject.direction.left, true);
assert.strictEqual(subject.direction.right, false);
assert.strictEqual(subject.direction.top, false);
assert.strictEqual(subject.direction.bottom, false);
subject.sync();
subject.y -= 1;
assert.strictEqual(subject.direction.left, false);
assert.strictEqual(subject.direction.right, false);
assert.strictEqual(subject.direction.top, true);
assert.strictEqual(subject.direction.bottom, false);
subject.sync();
assert.strictEqual(subject.direction.left, false);
assert.strictEqual(subject.direction.right, false);
assert.strictEqual(subject.direction.top, false);
assert.strictEqual(subject.direction.bottom, false);

// resume / stop
subject.setSpeedX(1).setSpeedY(2);

subject.pause();
subject.resume();

assert.strictEqual(subject.speedX, 1);
assert.strictEqual(subject.speedY, 2);

subject.stop();
subject.resume();

assert.strictEqual(subject.speedX, 0);
assert.strictEqual(subject.speedY, 0);
