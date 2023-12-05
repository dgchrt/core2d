"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene = void 0;
const Engine_ts_1 = require("./Engine.ts");
const Sprite_ts_1 = require("./Sprite.ts");
const Static_ts_1 = require("./Static.ts");
class Scene extends Sprite_ts_1.Sprite {
    constructor() {
        super();
        this.height = Engine_ts_1.Engine.height;
        this.width = Engine_ts_1.Engine.width;
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
    build(map, tileFactory = null, offsetX = 0, offsetY = 0, x = 0, y = 0) {
        tileFactory = tileFactory !== null && tileFactory !== void 0 ? tileFactory : function baseTileFactory(id) {
            return new Sprite_ts_1.Sprite().addTag("tile").setImage(id);
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
    sync() {
        Engine_ts_1.Engine.paint(this, this.layerIndex);
        let sprites = [];
        const solidSprites = [];
        for (let i = 0; i < this._sprites.length; ++i) {
            const sprite = this._sprites[i];
            sprite.update();
            if (sprite.sync()) {
                if (sprite.essential) {
                    this.setExpired();
                }
            }
            else {
                if (sprite.solid) {
                    solidSprites.push(sprite);
                }
                sprites.push(sprite);
                Engine_ts_1.Engine.paint(sprite, sprite.layerIndex);
            }
            sprite.collided = false;
        }
        Static_ts_1.Static.checkCollisions(solidSprites);
        this._sprites = sprites.concat(this._spritesQueue);
        this._spritesQueue = [];
        return Sprite_ts_1.Sprite.prototype.sync.call(this);
    }
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
    setTransition(transition) {
        this.transition = transition;
        return this;
    }
}
exports.Scene = Scene;
