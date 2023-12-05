import { Static } from './Static';

export class Frame {
	private _image: HTMLImageElement | null | undefined;
	private _duration: number;

	constructor(image: HTMLImageElement | string, duration = 0) {
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
		return this._image?.width || 0;
	}

	get height() {
		return this._image?.height || 0;
	}
}
