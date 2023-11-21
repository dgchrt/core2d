"use strict";

import { Engine } from "./Engine.mjs";
import { Sprite } from "./Sprite.mjs";
import { Static } from "./Static.mjs";

export class Scene extends Sprite {
	constructor() {
		super();
		this.height = Engine.height;
		this.width = Engine.width;
		this._sprites = [];
		this._spritesQueue = [];
	}

	init() {
		// no default behavior
	}

	add(sprite) {
		this._spritesQueue.push(sprite);
		sprite.scene = this;
		sprite.init();
		sprite.x -= sprite.speedX;
		sprite.y -= sprite.speedY;
		return this;
	}

	/**
	 * Builds a map in the scene.
	 *
	 * This method adds the tiles from the specified map to the scene.
	 *
	 * @param {Array<Array<string>>} map - The map to be built.
	 * @param {function} tileFactory - The tile factory to be used (optional).
	 * @param {number} offsetX - The horizontal offset to be used instead of the tile's width (optional).
	 * @param {number} offsetY - The vertical offset to be used instead of the tile's height (optional).
	 * @param {number} x - The horizontal coordinate to start building the tiles (optional).
	 * @param {number} y - The vertical coordinate to start building the tiles (optional).
	 * @returns {Scene} The instance of the scene itself.
	 * @memberof Scene
	 * @instance
	 */
	build(map, tileFactory = null, offsetX = 0, offsetY = 0, x = 0, y = 0) {
		tileFactory = tileFactory ?? function baseTileFactory(id) {
			return new Sprite().addTag("tile").setImage(id);
		};

		for (let i = 0; i < map.length; ++i) {
			const LINE = map[i];

			for (let j = 0; j < LINE.length; ++j) {
				const ID = map[i][j];

				if (!ID || "" == ID.trim()) {
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

	/**
	 * Returns a collection of sprites with the specified tag.
	 *
	 * @param {string} tag - The tag the sprites should contain.
	 * @returns {Array<Sprite>} A collection of sprites with the specified tag.
	 */
	getObjectsWithTag(tag) {
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

	/**
	 *
	 * @param {Transition} transition - The transition to be used.
	 * @returns {Scene} The instance of the scene itself.
	 * @memberof Scene
	 * @instance
	 */
	setTransition(transition) {
		this.transition = transition;
		return this;
	}

	// Private methods (not part of the public API)
	/**
	 *
	 * @returns {boolean}
	 */
	_sync() {
		Engine.paint(this, this.layerIndex);
		let sprites = [];
		const solidSprites = [];

		for (let i = 0; i < this._sprites.length; ++i) {
			const sprite = this._sprites[i];
			sprite.update();

			if (sprite._sync()) {
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
		return Sprite.prototype._sync.call(this);
	}
}
