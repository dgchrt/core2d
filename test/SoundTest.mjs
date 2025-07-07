"use strict";

import assert from "assert";

import { Sound } from "../src/Sound.mjs";

global.document = {
	getElementById: () => {
		return {
			pause: () => {},
			play: () => {},
		};
	},
};

let subject = new Sound();

// mute
assert.strictEqual(subject._isMute, false);
subject.mute();
assert.strictEqual(subject._isMute, true);
subject.mute();
assert.strictEqual(subject._isMute, false);

// fadeOut
assert.strictEqual(subject._isFading, false);
subject.fadeOut();
assert.strictEqual(subject._isFading, false);
subject._theme = {
	pause: () => {},
	play: () => {},
};
subject.fadeOut();
assert.strictEqual(subject._isFading, true);
