"use strict";

import { Command } from "./Command.mjs";
import { Key } from "./Key.mjs";

export const KeyMap = {
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
