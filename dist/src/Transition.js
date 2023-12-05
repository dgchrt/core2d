"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transition = void 0;
const Color_ts_1 = require("./Color.ts");
const Sprite_ts_1 = require("./Sprite.ts");
class Transition extends Sprite_ts_1.Sprite {
    init() {
        this.setColor(Color_ts_1.Color.Black);
        this.setHeight(this.scene.height);
        this._increase = this.scene.width / 32;
    }
    sync() {
        if (this.width > this.scene.width) {
            return true;
        }
        this.width += this._increase;
        return Sprite_ts_1.Sprite.prototype.sync.call(this);
    }
}
exports.Transition = Transition;
