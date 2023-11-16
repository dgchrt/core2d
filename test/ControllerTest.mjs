"use strict";

import assert from "assert";

global.document = {};

global.window = {
	document,
};

import { Command } from "../src/Command.mjs";
import { Core2D } from "../src/Core2D.mjs";

let controller;

// mock
const deviceMock = {
	commands: (() => {
		let result = {};

		for (let key in Command) {
			result[Command[key]] = true;
		}

		return result;
	})()
};

// no args constructor
controller = Core2D.getController();

for (let i in Command) {
	let value = Command[i];
	assert.strictEqual(controller.keyDown(value), undefined);
	assert.strictEqual(controller.keyPush(value), undefined);
}

// with all commands, first update
controller.setDevice(deviceMock);
assert.strictEqual(controller.update(), undefined);

for (let j in Command) {
	assert.strictEqual(controller.keyDown(Command[j]), true);
	assert.strictEqual(controller.keyPush(Command[j]), true);
}

// with all commands, second update
assert.strictEqual(controller.update(), undefined);

for (let k in Command) {
	assert.strictEqual(controller.keyDown(Command[k]), true);
	assert.strictEqual(controller.keyPush(Command[k]), false);
}
