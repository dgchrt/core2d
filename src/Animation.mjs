"use strict";

import { Frame } from "./Frame.mjs";

/**
 * Represents an animation, which is a sequence of frames.
 */
export class Animation {
	/**
	 * Creates a new Animation.
	 * @param {Frame[]} frames The frames of the animation.
	 */
	constructor(frames) {
		this._frames = frames;
		this._index = 0;
		this._tick = 0;
	}

	/**
	 * Creates a new Animation from a list of images.
	 * @param {HTMLImageElement[]|HTMLCanvasElement[]} images The images of the animation.
	 * @param {number} duration The duration of each frame in ticks.
	 * @returns {Animation} The new animation.
	 */
	static fromImages(images, duration) {
		return new this(images.map((image) => new Frame(image, duration)));
	}

	/**
	 * The image of the current frame.
	 * @type {HTMLImageElement|HTMLCanvasElement}
	 */
	get image() {
		return this._frames[this._index].image;
	}

	/**
	 * The width of the current frame.
	 * @type {number}
	 */
	get width() {
		return this._frames[this._index].width;
	}

	/**
	 * The height of the current frame.
	 * @type {number}
	 */
	get height() {
		return this._frames[this._index].height;
	}

	/**
	 * Sets the index of the current frame.
	 * @param {number} index The index of the frame.
	 */
	setFrameIndex(index) {
		if (index < this._frames.length) {
			this._index = index;
			this._tick = 0;
		}
	}

	/**
	 * The index of the current frame.
	 * @type {number}
	 */
	set frameIndex(index) {
		this.setFrameIndex(index);
	}

	/**
	 * Synchronizes the animation.
	 * @returns {boolean} Whether the animation has looped.
	 */
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
