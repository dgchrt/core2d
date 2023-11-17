"use strict";

import { Command } from "../Command.mjs";
import { Core2D } from "../Core2D.mjs";
import { Sprite } from "../Sprite.mjs";

const PUSHABLE_TAG = "pushable";

export class JumperSprite extends Sprite {
	constructor(scene) {
		super(scene);
		this.accelerationY = 0.5;
		this.canGoLeft = true;
		this.canGoRight = true;
		this.canJump = false;
		this.controller = Core2D.getController();
		this.jumpCommand = Command.A;
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
		} else if (collision.top) {
			if (this.speedY < 0) {
				this.setSpeedY(0);
				this.setTop(sprite.bottom + 1);
			}

			this.onTopCollision(sprite);
		} else if (collision.left) {
			if (!sprite.hasTag(PUSHABLE_TAG)) {
				this.canGoLeft = false;
			}

			this.setLeft(sprite.right + 1);
			this.onLeftCollision(sprite);
		} else if (collision.right) {
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

			if (this.canGoLeft && this.controller.keyDown(Command.LEFT)) {
				this.x -= this.step;
				this.canGoRight = true;
				this.onLeft();
			} else if (this.canGoRight && this.controller.keyDown(Command.RIGHT)) {
				this.x += this.step;
				this.canGoLeft = true;
				this.onRight();
			} else {
				this.onIdle();
			}

			if (!this.collided) {
				this.canGoLeft = true;
				this.canGoRight = true;
				this.canJump = false;
			}
		}

		return Sprite.prototype.sync.call(this);
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

