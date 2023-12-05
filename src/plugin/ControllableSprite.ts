import { Command } from '../Command';
import { Core2D } from '../Core2D';
import { Sprite } from '../Sprite';

export class ControllableSprite extends Sprite {
	constructor() {
		super();
		this.controller = Core2D.getController();
		this.step = 2;
	}

	setStep(step) {
		this.step = step;
		return this;
	}

	sync() {
		if (this.controller.keyDown(Command.LEFT) && this.left > 0) {
			this.x -= this.step;
		}

		if (this.controller.keyDown(Command.RIGHT) && this.right < this.scene.width) {
			this.x += this.step;
		}

		if (this.controller.keyDown(Command.UP) && this.top > 0) {
			this.y -= this.step;
		}

		if (this.controller.keyDown(Command.DOWN) && this.bottom < this.scene.height) {
			this.y += this.step;
		}

		return Sprite.prototype.sync.call(this);
	}
}
