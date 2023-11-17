"use strict";

import { Direction } from "./Direction.mjs";
import { Frame } from "./Frame.mjs";
import { Rect } from "./Rect.mjs";
import { Static } from "./Static.mjs";

export class Sprite extends Rect {
	constructor() {
		super();
		this.accelerationX = 0;
		this.accelerationY = 0;
		this.alpha = 1;
		this.boundary = null;
		this.color = null;
		this.essential = false;
		this.expiration = 0;
		this.expired = false;
		this.layerIndex = 0;
		this.maxSpeedX = 0;
		this.maxSpeedY = 0;
		this.solid = false;
		this.speedX = 0;
		this.speedY = 0;
		this.visible = true;
		this._animation = null;
		this._lastSpeedX = 0;
		this._lastSpeedY = 0;
		this._lastX = this.x;
		this._lastY = this.y;
		this._tags = {};
		this._tick = 0;
	}

	get angle() {
		return Static.toDegrees(Math.atan2(this.speedY, this.speedX));
	}

	get direction() {
		const DIRECTION = new Direction();

		if (this.x < this._lastX) {
			DIRECTION.setLeft();
		} else if (this.x > this._lastX) {
			DIRECTION.setRight();
		}

		if (this.y < this._lastY) {
			DIRECTION.setTop();
		} else if (this.y > this._lastY) {
			DIRECTION.setBottom();
		}

		return DIRECTION;
	}

	get image() {
		return this._animation && this._animation.image;
	}

	get tick() {
		return this._tick;
	}

	setAccelerationX(accelerationX = 0) {
		this.accelerationX = accelerationX;
		return this;
	}

	setAccelerationY(accelerationY = 0) {
		this.accelerationY = accelerationY;
		return this;
	}

	setAlpha(alpha = 1) {
		this.alpha = alpha;
		return this;
	}

	setBoundary(rect = null) {
		this.boundary = rect || this.scene;
		return this;
	}

	setColor(color) {
		this.color = color;
		return this;
	}

	setEssential(isEssential = true) {
		this.essential = isEssential;
		return this;
	}

	setExpiration(expiration = 0) {
		this.expiration = expiration;
		return this;
	}

	setExpired(isExpired = true) {
		this.expired = isExpired;
		return this;
	}

	setLayerIndex(layerIndex = 0) {
		this.layerIndex = layerIndex;
		return this;
	}

	setMaxSpeedX(maxSpeedX = 0) {
		this.maxSpeedX = maxSpeedX;
		return this;
	}

	setMaxSpeedY(maxSpeedY = 0) {
		this.maxSpeedY = maxSpeedY;
		return this;
	}

	setSolid(isSolid = true) {
		this.solid = isSolid;
		return this;
	}

	setSpeedX(speedX = 0) {
		this.speedX = speedX;
		return this;
	}

	setSpeedY(speedY = 0) {
		this.speedY = speedY;
		return this;
	}

	setVisible(isVisible = true) {
		this.visible = isVisible;
		return this;
	}

	setAnimation(animation) {
		if (animation == this._animation) {
			return this;
		}

		this._animation = animation;
		this._animation.setFrameIndex(0);
		this.height = this._animation.height;
		this.width = this._animation.width;
		return this;
	}

	setImage(image) {
		this.setAnimation(new Animation([new Frame(image)]));
		return this;
	}

	set image(image) {
		this.setImage(image);
	}

	setSpeedToAngle(speed, degrees) {
		const RADIANS = Static.toRadians(degrees);
		this.setSpeedX(speed * Math.cos(RADIANS));
		this.setSpeedY(speed * Math.sin(RADIANS));
		return this;
	}

	setSpeedToPoint(speed, point) {
		const SQUARE_DISTANCE = Math.abs(this.centerX - point.x) + Math.abs(this.centerY - point.y);
		this.setSpeedX((point.x - this.centerX) * speed / SQUARE_DISTANCE);
		this.setSpeedY((point.y - this.centerY) * speed / SQUARE_DISTANCE);
		return this;
	}

	addTag(tag) {
		this._tags[tag] = true;
		return this;
	}

	bounceFrom(direction) {
		if ((this.speedX < 0 && direction.left) || (this.speedX > 0 && direction.right)) {
			this.bounceX();
		}

		if ((this.speedY < 0 && direction.top) || (this.speedY > 0 && direction.bottom)) {
			this.bounceY();
		}

		return this;
	}

	bounceX() {
		this.setSpeedX(this.speedX * -1);
		this.x += this.speedX;
		return this;
	}

	bounceY() {
		this.setSpeedY(this.speedY * -1);
		this.y += this.speedY;
		return this;
	}

	expire() {
		this.expired = true;
	}

	getCollision(sprite) {
		const DIRECTION = new Direction();
		const TA = this.top;
		const RA = this.right;
		const BA = this.bottom;
		const LA = this.left;
		const XA = this.centerX;
		const YA = this.centerY;
		const TB = sprite.top;
		const RB = sprite.right;
		const BB = sprite.bottom;
		const LB = sprite.left;

		if (XA <= LB && RA < RB) {
			DIRECTION.setRight();
		} else if (XA >= RB && LA > LB) {
			DIRECTION.setLeft();
		}

		if (YA <= TB && BA < BB) {
			DIRECTION.setBottom();
		} else if (YA >= BB && TA > TB) {
			DIRECTION.setTop();
		}

		return DIRECTION;
	}

	hasCollision(rect) {
		return !(
			this.left > rect.right ||
	this.right < rect.left ||
	this.top > rect.bottom ||
	this.bottom < rect.top
		);
	}

	hasTag(tag) {
		return this._tags[tag];
	}

	init() {
		// no default behavior
	}

	offBoundary() {
		this.setExpired();
	}

	onAnimationLoop() {
		// no default behavior
	}

	onCollision(sprite) {
		// no default behavior
		return sprite;
	}

	pause() {
		this._lastSpeedX = this.speedX;
		this._lastSpeedY = this.speedY;
		this.speedX = 0;
		this.speedY = 0;
		return this;
	}

	render(context) {
		if (!this.visible) {
			return false;
		}

		const X = Math.floor(this.x + this.scene.x);
		const Y = Math.floor(this.y + this.scene.y);

		if (this.alpha < 1) {
			context.globalAlpha = this.alpha;
		}

		if (this.color) {
			context.fillStyle = this.color;
			context.fillRect(X, Y, this.width, this.height);
		}

		if (this._animation) {
			context.drawImage(this._animation.image, X, Y, this.width, this.height);
		}

		if (this.alpha < 1) {
			context.globalAlpha = 1;
		}

		return true;
	}

	resume() {
		this.speedX = this._lastSpeedX;
		this.speedY = this._lastSpeedY;
		return this;
	}

	stop() {
		this._lastSpeedX = 0;
		this._lastSpeedY = 0;
		this.speedX = 0;
		this.speedY = 0;
	}

	sync() {
		if (this.expired) {
			return true;
		}

		if (++this._tick == this.expiration) {
			this.setExpired();
		}

		if (this._animation && this._animation.sync()) {
			this.onAnimationLoop();
		}

		this.speedX += this.accelerationX;
		this.speedY += this.accelerationY;

		if (this.maxSpeedX && Math.abs(this.speedX) > this.maxSpeedX) {
			const SIGNAL = this.speedX / Math.abs(this.speedX);
			this.speedX = this.maxSpeedX * SIGNAL;
		}

		if (this.maxSpeedY && Math.abs(this.speedY) > this.maxSpeedY) {
			const SIGNAL = this.speedY / Math.abs(this.speedY);
			this.speedY = this.maxSpeedY * SIGNAL;
		}

		this._lastX = this.x;
		this._lastY = this.y;
		this.x += this.speedX;
		this.y += this.speedY;

		if (this.boundary && !this.hasCollision(this.boundary)) {
			this.offBoundary();
		}

		return false;
	}

	update() {
		// no default behavior
	}

	zoom(ratio) {
		const widthChange = this.width * ratio;
		this.width += widthChange;
		this.x -= widthChange / 2;
		const heightChange = this.height * ratio;
		this.height += heightChange;
		this.y -= heightChange / 2;
		return this;
	}
}
