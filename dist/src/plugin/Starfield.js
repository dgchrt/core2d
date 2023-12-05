"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Starfield = void 0;
const Color_ts_1 = require("../Color.ts");
const Core2D_ts_1 = require("../Core2D.ts");
const Sprite_ts_1 = require("../Sprite.ts");
const SPEED_SIZE_RATIO = 0.25;
const STAR_BLINK_CHANCE = 10;
const STAR_DENSITY = 100;
class Star extends Sprite_ts_1.Sprite {
    init() {
        this.addTag("star").setBoundary();
    }
    offBoundary() {
        if (this.right < this.scene.left) {
            this.setLeft(this.scene.right);
        }
        else if (this.left > this.scene.right) {
            this.setRight(this.scene.left);
        }
        if (this.bottom < this.scene.top) {
            this.setTop(this.scene.bottom);
        }
        else if (this.top > this.scene.bottom) {
            this.setBottom(this.scene.top);
        }
    }
    update() {
        this.setVisible(Core2D_ts_1.Core2D.random(STAR_BLINK_CHANCE * this.width) > 0);
    }
}
class Starfield extends Sprite_ts_1.Sprite {
    constructor() {
        super();
        this.colors = [Color_ts_1.Color.White];
    }
    init() {
        for (let i = 0; i < STAR_DENSITY; ++i) {
            const SIZE = 1 + Core2D_ts_1.Core2D.random(1);
            this.scene.add(new Star()
                .setColor(this.colors[Core2D_ts_1.Core2D.random(this.colors.length - 1)])
                .setX(Core2D_ts_1.Core2D.random(this.scene.width))
                .setY(Core2D_ts_1.Core2D.random(this.scene.height))
                .setWidth(SIZE)
                .setHeight(SIZE)
                .setSpeedX(this.speedX * SIZE * SPEED_SIZE_RATIO)
                .setSpeedY(this.speedY * SIZE * SPEED_SIZE_RATIO));
        }
    }
    setColors(colors) {
        this.colors = colors;
        return this;
    }
}
exports.Starfield = Starfield;
