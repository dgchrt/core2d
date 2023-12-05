import { Frame } from './Frame';

export class Animation {
	private _frames: Frame[]
	private _index: number
	private _tick: number

	constructor(frames: Frame[]) {
		this._frames = frames;
		this._index = 0;
		this._tick = 0;
	}

	static fromImages(images: (HTMLImageElement | string)[], duration: number) {
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

	setFrameIndex(index: number) {
		if (index < this._frames.length) {
			this._index = index;
			this._tick = 0;
		}
	}

	set frameIndex(index: number) {
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
