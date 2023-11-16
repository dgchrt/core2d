"use strict";

import { Engine } from "./Engine.mjs";
import { Point } from "./Point.mjs";

export class Pointer extends Point {
	constructor() {
		super();
		this._active = false;
		this._device = null;
		this._hold = false;
	}

	get down() {
		return this._active;
	}

	get push() {
		return this._active && !this._hold;
	}

	setDevice(device) {
		this._device = device;
	}

	update() {
		if (!this._device) {
			return;
		}

		this._hold = false;
		const LAST = this._active;
		this._active = this._device.command;

		if (this._active && LAST) {
			this._hold = true;
		}

		const REAL_X = this._device.x - Engine.offsetLeft;
		const REAL_Y = this._device.y - Engine.offsetTop;
		this.x = Math.floor(REAL_X * Engine.width / Engine.realWidth);
		this.y = Math.floor(REAL_Y * Engine.height / Engine.realHeight);
	}
}
