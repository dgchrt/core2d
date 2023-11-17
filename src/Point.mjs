"use strict";

export class Point {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	get position() {
		return this;
	}

	setX(x) {
		this.x = x;
		return this;
	}

	setY(y) {
		this.y = y;
		return this;
	}

	setPosition(point) {
		this.x = point.x;
		this.y = point.y;
		return this;
	}

	set position(point) {
		this.setPosition(point);
	}
}
