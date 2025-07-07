"use strict";

import { Engine } from "./Engine.mjs";
import { Sprite } from "./Sprite.mjs";
import { Static } from "./Static.mjs";

/**
 * Represents a scene, which is a collection of sprites that are rendered together.
 * @extends Sprite
 */
export class Scene extends Sprite {
  /**
   * Creates a new Scene.
   */
  constructor() {
    super();
    this.height = Engine.height;
    this.width = Engine.width;
    this._sprites = [];
    this._spritesQueue = [];
  }

  /**
   * Initializes the scene.
   */
  init() {
    // no default behavior
  }

  /**
   * Adds a sprite to the scene.
   * @param {Sprite} sprite The sprite to add.
   * @returns {Scene} This scene.
   */
  add(sprite) {
    this._spritesQueue.push(sprite);
    sprite.scene = this;
    sprite.init();
    sprite.x -= sprite.speedX;
    sprite.y -= sprite.speedY;
    return this;
  }

  /**
   * Builds a tilemap from a map.
   * @param {string[][]} map The map.
   * @param {function(string): Sprite} [tileFactory=null] A function that creates a tile from an ID.
   * @param {number} [offsetX=0] The horizontal offset between tiles.
   * @param {number} [offsetY=0] The vertical offset between tiles.
   * @param {number} [x=0] The horizontal position of the tilemap.
   * @param {number} [y=0] The vertical position of the tilemap.
   * @returns {Scene} This scene.
   */
  build(map, tileFactory = null, offsetX = 0, offsetY = 0, x = 0, y = 0) {
    tileFactory =
      tileFactory ??
      function baseTileFactory(id) {
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
   * Synchronizes the scene.
   * @returns {boolean} Whether the scene has expired.
   */
  sync() {
    Engine.paint(this, this.layerIndex);
    let sprites = [];
    const solidSprites = [];

    for (let i = 0; i < this._sprites.length; ++i) {
      const sprite = this._sprites[i];

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

  /**
   * Gets all sprites with a specific tag.
   * @param {string} tag The tag.
   * @returns {Sprite[]} The sprites with the tag.
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
   * Sets the transition to the next scene.
   * @param {Transition} transition The transition.
   * @returns {Scene} This scene.
   */
  setTransition(transition) {
    this.transition = transition;
    return this;
  }
}
