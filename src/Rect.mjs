"use strict";

import { Point } from "./Point.mjs";

export class Rect extends Point {
	constructor(x, y, width = 0, height = 0) {
		super(x, y);
		this.width = width;
		this.height = height;
	}

	get left() {
		return this.x;
	}

	get right() {
		return this.x + this.width - 1;
	}

	get top() {
		return this.y;
	}

	get bottom() {
		return this.y + this.height - 1;
	}

	get centerX() {
		return this.x + Math.floor(this.width / 2);
	}

	get centerY() {
		return this.y + Math.floor(this.height / 2);
	}

	get center() {
		return new Point(this.centerX, this.centerY);
	}

	setWidth(width) {
		this.width = width;
		return this;
	}

	setHeight(height) {
		this.height = height;
		return this;
	}

	setSize(rect) {
		this.setWidth(rect.width);
		this.setHeight(rect.height);
		return this;
	}

	setLeft(x) {
		this.x = x;
		return this;
	}

	setRight(x) {
		this.x = x - this.width + 1;
		return this;
	}

	setTop(y) {
		this.y = y;
		return this;
	}

	setBottom(y) {
		this.y = y - this.height + 1;
		return this;
	}

	setCenterX(x) {
		this.x = x - Math.floor(this.width / 2);
		return this;
	}

	setCenterY(y) {
		this.y = y - Math.floor(this.height / 2);
		return this;
	}

	setCenter(point) {
		this.setCenterX(point.x);
		this.setCenterY(point.y);
		return this;
	}

	set left(x) {
		this.setLeft(x);
	}

	set right(x) {
		this.setRight(x);
	}

	set top(y) {
		this.setTop(y);
	}

	set bottom(y) {
		this.setBottom(y);
	}

	set centerX(x) {
		this.setCenterX(x);
	}

	set centerY(y) {
		this.setCenterY(y);
	}

	set center(point) {
		this.setCenter(point);
	}

	makeUnion(rect) {
		const RECT = new Rect(Math.min(this.x, rect.x), Math.min(this.y, rect.y));

		return RECT
			.setWidth(Math.max(this.right, rect.right) - RECT.x + 1)
			.setHeight(Math.max(this.bottom, rect.bottom) - RECT.y + 1);
	}
}
