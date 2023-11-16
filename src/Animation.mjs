"use strict";

import { Frame } from "./Frame.mjs";

export class Animation {
	constructor(frames) {
		this._frames = frames;
		this._index = 0;
		this._tick = 0;
	}

	static fromImages(images, duration) {
		return new this(images.map(image => new Frame(image, duration)));
	}

	get image() {
		return this._frames[this._index].image;
	}

	get width() {
		return this._frames[this._index].width;
	}

	get height() {
		return this._frames[this._index].height;
	}

	setFrameIndex(index) {
		if (index < this._frames.length) {
			this._index = index;
			this._tick = 0;
		}
	}

	set frameIndex(index) {
		this.setFrameIndex(index);
	}

	sync() {
		const DURATION = this._frames[this._index].duration;
		let hasLooped = false;

		if (DURATION && ++this._tick >= DURATION) {
			let index = this._index + 1;

			if (index == this._frames.length) {
				hasLooped = true;
				index = 0;
			}

			this.setFrameIndex(index);
		}

		return hasLooped;
	}
}
