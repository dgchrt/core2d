"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JumperSprite = void 0;
const Command_ts_1 = require("../Command.ts");
const Core2D_ts_1 = require("../Core2D.ts");
const Sprite_ts_1 = require("../Sprite.ts");
const PUSHABLE_TAG = 'pushable';
class JumperSprite extends Sprite_ts_1.Sprite {
    constructor(scene) {
        super(scene);
        this.accelerationY = 0.5;
        this.canGoLeft = true;
        this.canGoRight = true;
        this.canJump = false;
        this.controller = Core2D_ts_1.Core2D.getController();
        this.jumpCommand = Command_ts_1.Command.A;
        this.jumpSpeed = -8;
        this.solid = true;
        this.step = 2;
    }
    setJumpCommand(jumpCommand) {
        this.jumpCommand = jumpCommand;
        return this;
    }
    setJumpSpeed(jumpSpeed) {
        this.jumpSpeed = jumpSpeed;
        return this;
    }
    setStep(step) {
        this.step = step;
        return this;
    }
    jump() {
        this.canJump = false;
        this.setSpeedY(this.jumpSpeed);
        this.onJump();
    }
    onCollision(sprite) {
        const collision = this.getCollision(sprite);
        if (collision.bottom) {
            if (this.speedY > 0) {
                this.setSpeedY(0);
                this.setBottom(sprite.top - 1);
                this.canJump = true;
            }
            this.onBottomCollision(sprite);
        }
        else if (collision.top) {
            if (this.speedY < 0) {
                this.setSpeedY(0);
                this.setTop(sprite.bottom + 1);
            }
            this.onTopCollision(sprite);
        }
        else if (collision.left) {
            if (!sprite.hasTag(PUSHABLE_TAG)) {
                this.canGoLeft = false;
            }
            this.setLeft(sprite.right + 1);
            this.onLeftCollision(sprite);
        }
        else if (collision.right) {
            if (!sprite.hasTag(PUSHABLE_TAG)) {
                this.canGoRight = false;
            }
            this.setRight(sprite.left - 1);
            this.onRightCollision(sprite);
        }
    }
    sync() {
        if (this.solid) {
            if (this.canJump && this.controller.keyPush(this.jumpCommand)) {
                this.jump();
            }
            if (this.canGoLeft && this.controller.keyDown(Command_ts_1.Command.LEFT)) {
                this.x -= this.step;
                this.canGoRight = true;
                this.onLeft();
            }
            else if (this.canGoRight && this.controller.keyDown(Command_ts_1.Command.RIGHT)) {
                this.x += this.step;
                this.canGoLeft = true;
                this.onRight();
            }
            else {
                this.onIdle();
            }
            if (!this.collided) {
                this.canGoLeft = true;
                this.canGoRight = true;
                this.canJump = false;
            }
        }
        return Sprite_ts_1.Sprite.prototype.sync.call(this);
    }
    onJump() {
        // no default behavior
    }
    onIdle() {
        // no default behavior
    }
    onLeft() {
        // no default behavior
    }
    onRight() {
        // no default behavior
    }
    onLeftCollision(sprite) {
        // no default behavior
        return sprite;
    }
    onRightCollision(sprite) {
        // no default behavior
        return sprite;
    }
    onTopCollision(sprite) {
        // no default behavior
        return sprite;
    }
    onBottomCollision(sprite) {
        // no default behavior
        return sprite;
    }
}
exports.JumperSprite = JumperSprite;
//# sourceMappingURL=JumperSprite.js.map