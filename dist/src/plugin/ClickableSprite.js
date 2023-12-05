"use strict";
"use static";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClickableSprite = void 0;
const Sprite_ts_1 = require("../Sprite.ts");
class ClickableSprite extends Sprite_ts_1.Sprite {
    constructor() {
        super();
        this.addTag("clickable");
        this.setSolid();
    }
    onClick() {
        // no default behavior
    }
    onHoverIn() {
        // no default behavior
    }
    onHoverOut() {
        // no default behavior
    }
}
exports.ClickableSprite = ClickableSprite;
