"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllableSprite = void 0;
const Command_ts_1 = require("../Command.ts");
const Core2D_ts_1 = require("../Core2D.ts");
const Sprite_ts_1 = require("../Sprite.ts");
class ControllableSprite extends Sprite_ts_1.Sprite {
    constructor() {
        super();
        this.controller = Core2D_ts_1.Core2D.getController();
        this.step = 2;
    }
    setStep(step) {
        this.step = step;
        return this;
    }
    sync() {
        if (this.controller.keyDown(Command_ts_1.Command.LEFT) && this.left > 0) {
            this.x -= this.step;
        }
        if (this.controller.keyDown(Command_ts_1.Command.RIGHT) && this.right < this.scene.width) {
            this.x += this.step;
        }
        if (this.controller.keyDown(Command_ts_1.Command.UP) && this.top > 0) {
            this.y -= this.step;
        }
        if (this.controller.keyDown(Command_ts_1.Command.DOWN) && this.bottom < this.scene.height) {
            this.y += this.step;
        }
        return Sprite_ts_1.Sprite.prototype.sync.call(this);
    }
}
exports.ControllableSprite = ControllableSprite;
