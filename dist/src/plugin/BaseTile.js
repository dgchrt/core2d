"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTile = void 0;
const Sprite_ts_1 = require("../Sprite.ts");
class BaseTile extends Sprite_ts_1.Sprite {
    constructor(id) {
        super();
        this.setImage(id);
    }
}
exports.BaseTile = BaseTile;
