import { Color } from './Color';
import { Sprite } from './Sprite';

export class Transition extends Sprite {
	init() {
		this.setColor(Color.Black);
		this.setHeight(this.scene.height);
		this._increase = this.scene.width / 32;
	}

	sync() {
		if (this.width > this.scene.width) {
			return true;
		}

		this.width += this._increase;
		return Sprite.prototype.sync.call(this);
	}
}
