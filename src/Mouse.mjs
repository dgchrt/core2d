"use strict";

import { Point } from "./Point.mjs";

export class Mouse extends Point {
	constructor(event) {
		super();
		this.updateCoordinates(event);

		addEventListener("mousedown", (event) => {
			event.preventDefault();
			this._isDown = true;
		}, false);

		addEventListener("mousemove", (event) => {
			this.updateCoordinates(event);
		}, false);

		addEventListener("mouseup", (event) => {
			event.preventDefault();
			this._isDown = false;
		}, false);
	}

	get command() {
		return this._isDown;
	}

	updateCoordinates(event) {
		event.preventDefault();
		this.x = event.x ?? event.clientX ?? 0;
		this.y = event.y ?? event.clientY ?? 0;
	}
}
