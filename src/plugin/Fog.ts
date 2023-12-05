import { Sprite } from '../Sprite';

export class Fog extends Sprite {
	init() {
		this.scene.add(new FogLayer()
			.setImageId('fogSprite0')
			.setSpeedX(-1));

		this.scene.add(new FogLayer()
			.setImageId('fogSprite1')
			.setSpeedX(1)
			.setRight(this.scene.right));
	}
}

class FogLayer extends Sprite {
	init() {
		this.setLayerIndex(2)
			.setHeight(this.scene.height)
			.setWidth(this.scene.width * 2);
	}

	update() {
		if (this.speedX < 0 && this.right == this.scene.right || this.speedX > 0 && this.left == this.scene.left) {
			const SIGNAL = this.speedX / Math.abs(this.speedX);
			this.x -= this.scene.width * SIGNAL;
		}
	}
}
