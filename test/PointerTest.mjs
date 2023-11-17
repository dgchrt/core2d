"use strict";

import assert from "assert";

import { Core2D } from "../src/Core2D.mjs";

let pointer;

// mock
const deviceMock = {
	command: true,
	x: 100,
	y: 200,
};

// without device
pointer = Core2D.getPointer();
pointer.update();
assert.strictEqual(pointer.x, 0);
assert.strictEqual(pointer.y, 0);
assert.strictEqual(pointer.down, false);

// with device
pointer.setDevice(deviceMock);
pointer.update();
assert.strictEqual(pointer.x, 100);
assert.strictEqual(pointer.y, 200);
assert.strictEqual(pointer.down, true);
