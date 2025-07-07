"use strict";

import { Static } from "./Static.mjs";

/**
 * Represents a frame in an animation.
 */
export class Frame {
	/**
	 * Creates a new Frame.
	 * @param {HTMLImageElement|HTMLCanvasElement} image The image of the frame.
	 * @param {number} [duration=0] The duration of the frame in ticks.
	 */
	constructor(image, duration = 0) {
		this._image = Static.getImage(image);
		this._duration = duration;
	}

	/**
	 * The image of the frame.
	 * @type {HTMLImageElement|HTMLCanvasElement}
	 */
	get image() {
		return this._image;
	}

	/**
	 * The duration of the frame in ticks.
	 * @type {number}
	 */
	get duration() {
		return this._duration;
	}

	/**
	 * The width of the frame.
	 * @type {number}
	 */
	get width() {
		return this._image.width;
	}

	/**
	 * The height of the frame.
	 * @type {number}
	 */
	get height() {
		return this._image.height;
	}
}
