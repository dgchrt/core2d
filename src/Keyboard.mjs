"use sttrict";

import { Command } from "./Command.mjs";
import { Key } from "./Key.mjs";

export class Keyboard {
	constructor(event) {
		this._buffer = {};

		this.keyToCommandMap = {
			[Key.UP]: Command.UP,
			[Key.E]: Command.UP,
			[Key.I]: Command.UP,
			[Key.DOWN]: Command.DOWN,
			[Key.D]: Command.DOWN,
			[Key.K]: Command.DOWN,
			[Key.LEFT]: Command.LEFT,
			[Key.S]: Command.LEFT,
			[Key.J]: Command.LEFT,
			[Key.RIGHT]: Command.RIGHT,
			[Key.F]: Command.RIGHT,
			[Key.L]: Command.RIGHT,
			[Key.SPACE]: Command.A,
			[Key.ALT]: Command.B,
			[Key.CTRL]: Command.X,
			[Key.SHIFT]: Command.Y,
			[Key.ENTER]: Command.START,
			[Key.BACK]: Command.SELECT,
		};

		this.onKey(event, true);
		addEventListener("keydown", event => this.onKey(event, true), false);
		addEventListener("keyup", event => this.onKey(event, false), false);
	}

	get commands() {
		const RESULT = {};

		for (let i in this._buffer) {
			if (this._buffer[i]) {
				RESULT[i] = true;
			}
		}

		return RESULT;
	}

	onKey(event, isDown) {
		const COMMAND = this.keyToCommandMap[event.keyCode];
		this._buffer[COMMAND] = isDown;

		if (isDown && "number" == typeof(COMMAND)) {
			event.preventDefault();
		}
	}
}
