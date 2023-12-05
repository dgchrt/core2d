import { ACL } from './ACL';
import { Sprite } from './Sprite';

export class Static {
	static checkCollisions(sprites: Sprite[]) {
		const LENGTH = sprites.length;

		for (let i = 0; i < LENGTH - 1; ++i) {
			const LEFT_SPRITE = sprites[i];

			for (let j = i + 1; j < LENGTH; ++j) {
				const RIGHT_SPRITE = sprites[j];

				if (LEFT_SPRITE.hasCollision(RIGHT_SPRITE)) {
					LEFT_SPRITE.collided = true;
					LEFT_SPRITE.onCollision(RIGHT_SPRITE);
					RIGHT_SPRITE.collided = true;
					RIGHT_SPRITE.onCollision(LEFT_SPRITE);
				}
			}
		}
	}

	static getElement(id: string): HTMLElement | null {
		return ACL.document.getElementById(id);
	}

	static getElements(name: string) {
		return Array.from(ACL.document.getElementsByTagName(name));
	}

	static getGamepads(): (Gamepad | null)[] {
		if (!navigator.getGamepads) {
			return [];
		}

		return navigator.getGamepads();
	}

	static getImage(image: (HTMLImageElement | string)): HTMLImageElement | null | undefined {
		if ('string' == typeof (image)) {
			return this.getElement(image) as HTMLImageElement;
		}

		return image;
	}

	static toDegrees(radians: number) {
		return radians * 180 / Math.PI;
	}

	static toRadians(degrees: number) {
		return degrees * Math.PI / 180;
	}
}
