"use strict";

import { Static } from "./Static.mjs";

export class Frame {
	constructor(image, duration = 0) {
		this._image = Static.getImage(image);
		this._duration = duration;
	}

	get image() {
		return this._image;
	}

	get duration() {
		return this._duration;
	}

	get width() {
		return this._image.width;
	}

	get height() {
		return this._image.height;
	}
}
