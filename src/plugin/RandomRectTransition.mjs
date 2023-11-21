"use strict";

import { Color } from "../Color.mjs";
import { Core2D } from "../Core2D.mjs";
import { Sprite } from "../Sprite.mjs";

export class RandomRectTransition extends Sprite {
	init() {
		this.columns = 16;
		this.rows = 8;
		this.setColor(Color.Black);
		this.setWidth(this.scene.width / this.columns);
		this.setHeight(this.scene.height / this.rows);
		this.rects = [];

		for (let i = 0; i < this.columns * this.rows; ++i) {
			this.rects.push(i);
		}
	}

	_sync() {
		if (!this.rects.length) {
			return true;
		}

		const number = this.rects.splice(Core2D.random(this.rects.length - 1), 1);
		const column = number % this.columns;
		const row = Math.floor(number / this.columns);
		this.x = column * this.width;
		this.y = row * this.height;
		return Sprite.prototype._sync.call(this);
	}
}

