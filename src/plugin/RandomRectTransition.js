"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomRectTransition = void 0;
const Color_ts_1 = require("../Color.ts");
const Core2D_ts_1 = require("../Core2D.ts");
const Sprite_ts_1 = require("../Sprite.ts");
class RandomRectTransition extends Sprite_ts_1.Sprite {
    init() {
        this.columns = 16;
        this.rows = 8;
        this.setColor(Color_ts_1.Color.Black);
        this.setWidth(this.scene.width / this.columns);
        this.setHeight(this.scene.height / this.rows);
        this.rects = [];
        for (let i = 0; i < this.columns * this.rows; ++i) {
            this.rects.push(i);
        }
    }
    sync() {
        if (!this.rects.length) {
            return true;
        }
        const number = this.rects.splice(Core2D_ts_1.Core2D.random(this.rects.length - 1), 1);
        const column = number % this.columns;
        const row = Math.floor(number / this.columns);
        this.x = column * this.width;
        this.y = row * this.height;
        return Sprite_ts_1.Sprite.prototype.sync.call(this);
    }
}
exports.RandomRectTransition = RandomRectTransition;
//# sourceMappingURL=RandomRectTransition.js.map