"use strict";

import assert from "assert";

import { Scene } from "../src/Scene.mjs";
import { Sprite } from "../src/Sprite.mjs";

let subject = new Scene();

// add sprites
subject.add(new Sprite().addTag("test"));

// get objects with tag
assert.strictEqual(1, subject.getObjectsWithTag("test").length);
assert.strictEqual(0, subject.getObjectsWithTag("blah").length);

// build empty tiles
subject.build(
	[
		["a", "b", "c"],
		["d", "e", "f"],
	],
	() => null,
	0,
	0,
	0,
	0
);
