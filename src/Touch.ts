import { Point } from './Point';

export class Touch extends Point {
	constructor(event) {
		super();
		event.preventDefault();
		this._isDown = true;
		this.updateCoordinates(event);

		addEventListener('touchend', (event) => {
			event.preventDefault();
			this._isDown = false;
			this.updateCoordinates(event);
		}, false);

		addEventListener('touchmove', (event) => {
			event.preventDefault();
			this.updateCoordinates(event);
		}, false);

		addEventListener('touchstart', () => {
			event.preventDefault();
			this._isDown = true;
			this.updateCoordinates(event);
		}, false);
	}

	get command() {
		return this._isDown;
	}

	updateCoordinates(event) {
		const TOUCHES = event.changedTouches;
		const TOUCH = TOUCHES[0];
		this.x = TOUCH.pageX;
		this.y = TOUCH.pageY;
	}
}
