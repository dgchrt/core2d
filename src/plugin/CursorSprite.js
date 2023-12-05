"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursorSprite = void 0;
const Core2D_ts_1 = require("../Core2D.ts");
const Rect_ts_1 = require("../Rect.ts");
const Sprite_ts_1 = require("../Sprite.ts");
class CursorSprite extends Sprite_ts_1.Sprite {
    constructor() {
        super();
        this.hovering = null;
        this.pointer = Core2D_ts_1.Core2D.getPointer();
        this.setSolid();
    }
    check(sprite) {
        const FOCUS = new Rect_ts_1.Rect(this.getLeft(), this.getTop(), 1, 1);
        return sprite.hasCollision(FOCUS);
    }
    onCollision(sprite) {
        if (sprite.hasTag('clickable') && this.check(sprite)) {
            if (this.hovering != sprite) {
                if (this.hovering) {
                    this.hovering.onHoverOut();
                }
                this.hovering = sprite;
                sprite.onHoverIn();
            }
        }
    }
    update() {
        this.setPosition(this.pointer);
        if (this.hovering) {
            if (!this.hasCollision(this.hovering)) {
                this.hovering.onHoverOut();
                this.hovering = null;
            }
            else if (this.pointer.getPush()) {
                this.hovering.onClick();
            }
        }
    }
}
exports.CursorSprite = CursorSprite;
//# sourceMappingURL=CursorSprite.js.map