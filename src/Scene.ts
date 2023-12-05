import { Engine } from './Engine';
import { Sprite } from './Sprite';
import { Static } from './Static';
import { Transition } from './Transition';

type tileFactory = (id: string) => Sprite;

function baseTileFactory(id: string): Sprite {
	return new Sprite().addTag('tile').setImage(id);
};

export class Scene extends Sprite {
	transition: Transition | null;
	private _sprites: Sprite[]
	private _spritesQueue: Sprite[]

	constructor() {
		super();
		this.height = Engine.height;
		this.width = Engine.width;
		this.transition = null;
		this._sprites = [];
		this._spritesQueue = [];
	}

	init() {
		// no default behavior
	}

	add(sprite: Sprite) {
		this._spritesQueue.push(sprite);
		sprite.scene = this;
		sprite.init();
		sprite.x -= sprite.speedX;
		sprite.y -= sprite.speedY;
		return this;
	}

	build(map: string[][], tileFactory: tileFactory | null, offsetX: number = 0, offsetY: number = 0, x: number = 0, y: number = 0) {
		tileFactory = tileFactory ?? baseTileFactory;

		for (let i = 0; i < map.length; ++i) {
			const LINE = map[i];

			for (let j = 0; j < LINE.length; ++j) {
				const ID = map[i][j];

				if (!ID || '' == ID.trim()) {
					continue;
				}

				const TILE = tileFactory(ID);

				if (TILE) {
					const X = offsetX || TILE.width;
					const Y = offsetY || TILE.height;
					TILE.x = x + j * X;
					TILE.y = y + i * Y;
					this.add(TILE);
				}
			}
		}

		return this;
	}

	sync() {
		Engine.paint(this, this.layerIndex);
		let sprites = [];
		const solidSprites = [];

		for (let i = 0; i < this._sprites.length; ++i) {
			const sprite = this._sprites[i];
			sprite.update();

			if (sprite.sync()) {
				if (sprite.essential) {
					this.setExpired();
				}
			} else {
				if (sprite.solid) {
					solidSprites.push(sprite);
				}

				sprites.push(sprite);
				Engine.paint(sprite, sprite.layerIndex);
			}

			sprite.collided = false;
		}

		Static.checkCollisions(solidSprites);
		this._sprites = sprites.concat(this._spritesQueue);
		this._spritesQueue = [];
		return Sprite.prototype.sync.call(this);
	}

	getObjectsWithTag(tag: string) {
		const RESULT = [];
		const SPRITES = this._sprites.concat(this._spritesQueue);

		for (let i = 0; i < SPRITES.length; ++i) {
			const SPRITE = SPRITES[i];

			if (SPRITE.hasTag(tag)) {
				RESULT.push(SPRITE);
			}
		}

		return RESULT;
	}

	setTransition(transition: Transition) {
		this.transition = transition;
		return this;
	}
}
