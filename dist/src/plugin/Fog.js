"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fog = void 0;
const Sprite_ts_1 = require("../Sprite.ts");
class Fog extends Sprite_ts_1.Sprite {
    init() {
        this.scene.add(new FogLayer()
            .setImageId("fogSprite0")
            .setSpeedX(-1));
        this.scene.add(new FogLayer()
            .setImageId("fogSprite1")
            .setSpeedX(1)
            .setRight(this.scene.right));
    }
}
exports.Fog = Fog;
class FogLayer extends Sprite_ts_1.Sprite {
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
