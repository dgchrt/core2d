"use strict";

import { Animation } from "./Animation.mjs";
import { Direction } from "./Direction.mjs";
import { Frame } from "./Frame.mjs";
import { Rect } from "./Rect.mjs";
import { Static } from "./Static.mjs";

/**
 * Represents a sprite, which is a basic game object that can be rendered on the screen.
 * @extends Rect
 */
export class Sprite extends Rect {
	/**
	 * Creates a new Sprite.
	 */
	constructor() {
		super();

		/**
		 * The horizontal acceleration of the sprite.
		 * @type {number}
		 */
		this.accelerationX = 0;

		/**
		 * The vertical acceleration of the sprite.
		 * @type {number}
		 */
		this.accelerationY = 0;

		/**
		 * The alpha transparency of the sprite.
		 * @type {number}
		 */
		this.alpha = 1;

		/**
		 * The boundary of the sprite. If the sprite goes outside of this boundary, the `offBoundary` method is called.
		 * @type {Rect}
		 */
		this.boundary = null;

		/**
		 * The color of the sprite.
		 * @type {string}
		 */
		this.color = null;

		/**
		 * Whether the sprite is essential. If an essential sprite expires, the scene expires as well.
		 * @type {boolean}
		 */
		this.essential = false;

		/**
		 * The expiration time of the sprite, in ticks.
		 * @type {number}
		 */
		this.expiration = 0;

		/**
		 * Whether the sprite has expired.
		 * @type {boolean}
		 */
		this.expired = false;

		/**
		 * The layer index of the sprite. Sprites with a higher layer index are rendered on top of sprites with a lower layer index.
		 * @type {number}
		 */
		this.layerIndex = 0;

		/**
		 * The maximum horizontal speed of the sprite.
		 * @type {number}
		 */
		this.maxSpeedX = 0;

		/**
		 * The maximum vertical speed of the sprite.
		 * @type {number}
		 */
		this.maxSpeedY = 0;

		/**
		 * Whether the sprite is solid. Solid sprites can collide with other solid sprites.
		 * @type {boolean}
		 */
		this.solid = false;

		/**
		 * The horizontal speed of the sprite.
		 * @type {number}
		 */
		this.speedX = 0;

		/**
		 * The vertical speed of the sprite.
		 * @type {number}
		 */
		this.speedY = 0;

		/**
		 * Whether the sprite is visible.
		 * @type {boolean}
		 */
		this.visible = true;

		/**
		 * The animation of the sprite.
		 * @type {Animation}
		 * @private
		 */
		this._animation = null;

		/**
		 * The last horizontal speed of the sprite.
		 * @type {number}
		 * @private
		 */
		this._lastSpeedX = 0;

		/**
		 * The last vertical speed of the sprite.
		 * @type {number}
		 * @private
		 */
		this._lastSpeedY = 0;

		/**
		 * The last horizontal position of the sprite.
		 * @type {number}
		 * @private
		 */
		this._lastX = this.x;

		/**
		 * The last vertical position of the sprite.
		 * @type {number}
		 * @private
		 */
		this._lastY = this.y;

		/**
		 * The tags of the sprite.
		 * @type {Object<string, boolean>}
		 * @private
		 */
		this._tags = {};

		/**
		 * The number of ticks that have passed since the sprite was created.
		 * @type {number}
		 * @private
		 */
		this._tick = 0;
	}

	/**
	 * The angle of the sprite in degrees.
	 * @type {number}
	 */
	get angle() {
		return Static.toDegrees(Math.atan2(this.speedY, this.speedX));
	}

	/**
	 * The direction of the sprite.
	 * @type {Direction}
	 */
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

	/**
	 * The image of the sprite.
	 * @type {HTMLImageElement|HTMLCanvasElement}
	 */
	get image() {
		return this._animation && this._animation.image;
	}

	/**
	 * The number of ticks that have passed since the sprite was created.
	 * @type {number}
	 */
	get tick() {
		return this._tick;
	}

	/**
	 * Sets the horizontal acceleration of the sprite.
	 * @param {number} accelerationX The horizontal acceleration.
	 * @returns {Sprite} This sprite.
	 */
	setAccelerationX(accelerationX = 0) {
		this.accelerationX = accelerationX;
		return this;
	}

	/**
	 * Sets the vertical acceleration of the sprite.
	 * @param {number} accelerationY The vertical acceleration.
	 * @returns {Sprite} This sprite.
	 */
	setAccelerationY(accelerationY = 0) {
		this.accelerationY = accelerationY;
		return this;
	}

	/**
	 * Sets the alpha transparency of the sprite.
	 * @param {number} alpha The alpha transparency.
	 * @returns {Sprite} This sprite.
	 */
	setAlpha(alpha = 1) {
		this.alpha = alpha;
		return this;
	}

	/**
	 * Sets the boundary of the sprite.
	 * @param {Rect} rect The boundary.
	 * @returns {Sprite} This sprite.
	 */
	setBoundary(rect = null) {
		this.boundary = rect || this.scene;
		return this;
	}

	/**
	 * Sets the color of the sprite.
	 * @param {string} color The color.
	 * @returns {Sprite} This sprite.
	 */
	setColor(color) {
		this.color = color;
		return this;
	}

	/**
	 * Sets whether the sprite is essential.
	 * @param {boolean} isEssential Whether the sprite is essential.
	 * @returns {Sprite} This sprite.
	 */
	setEssential(isEssential = true) {
		this.essential = isEssential;
		return this;
	}

	/**
	 * Sets the expiration time of the sprite.
	 * @param {number} expiration The expiration time in ticks.
	 * @returns {Sprite} This sprite.
	 */
	setExpiration(expiration = 0) {
		this.expiration = expiration;
		return this;
	}

	/**
	 * Sets whether the sprite has expired.
	 * @param {boolean} isExpired Whether the sprite has expired.
	 * @returns {Sprite} This sprite.
	 */
	setExpired(isExpired = true) {
		this.expired = isExpired;
		return this;
	}

	/**
	 * Sets the layer index of the sprite.
	 * @param {number} layerIndex The layer index.
	 * @returns {Sprite} This sprite.
	 */
	setLayerIndex(layerIndex = 0) {
		this.layerIndex = layerIndex;
		return this;
	}

	/**
	 * Sets the maximum horizontal speed of the sprite.
	 * @param {number} maxSpeedX The maximum horizontal speed.
	 * @returns {Sprite} This sprite.
	 */
	setMaxSpeedX(maxSpeedX = 0) {
		this.maxSpeedX = maxSpeedX;
		return this;
	}

	/**
	 * Sets the maximum vertical speed of the sprite.
	 * @param {number} maxSpeedY The maximum vertical speed.
	 * @returns {Sprite} This sprite.
	 */
	setMaxSpeedY(maxSpeedY = 0) {
		this.maxSpeedY = maxSpeedY;
		return this;
	}

	/**
	 * Sets whether the sprite is solid.
	 * @param {boolean} isSolid Whether the sprite is solid.
	 * @returns {Sprite} This sprite.
	 */
	setSolid(isSolid = true) {
		this.solid = isSolid;
		return this;
	}

	/**
	 * Sets the horizontal speed of the sprite.
	 * @param {number} speedX The horizontal speed.
	 * @returns {Sprite} This sprite.
	 */
	setSpeedX(speedX = 0) {
		this.speedX = speedX;
		return this;
	}

	/**
	 * Sets the vertical speed of the sprite.
	 * @param {number} speedY The vertical speed.
	 * @returns {Sprite} This sprite.
	 */
	setSpeedY(speedY = 0) {
		this.speedY = speedY;
		return this;
	}

	/**
	 * Sets whether the sprite is visible.
	 * @param {boolean} isVisible Whether the sprite is visible.
	 * @returns {Sprite} This sprite.
	 */
	setVisible(isVisible = true) {
		this.visible = isVisible;
		return this;
	}

	/**
	 * Sets the animation of the sprite.
	 * @param {Animation} animation The animation.
	 * @returns {Sprite} This sprite.
	 */
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

	/**
	 * Sets the image of the sprite.
	 * @param {HTMLImageElement|HTMLCanvasElement} image The image.
	 * @returns {Sprite} This sprite.
	 */
	setImage(image) {
		this.setAnimation(new Animation([new Frame(image)]));
		return this;
	}

	/**
	 * The image of the sprite.
	 * @type {HTMLImageElement|HTMLCanvasElement}
	 */
	set image(image) {
		this.setImage(image);
	}

	/**
	 * Sets the speed of the sprite to an angle.
	 * @param {number} speed The speed.
	 * @param {number} degrees The angle in degrees.
	 * @returns {Sprite} This sprite.
	 */
	setSpeedToAngle(speed, degrees) {
		const RADIANS = Static.toRadians(degrees);
		this.setSpeedX(speed * Math.cos(RADIANS));
		this.setSpeedY(speed * Math.sin(RADIANS));
		return this;
	}

	/**
	 * Sets the speed of the sprite to a point.
	 * @param {number} speed The speed.
	 * @param {Point} point The point.
	 * @returns {Sprite} This sprite.
	 */
	setSpeedToPoint(speed, point) {
		const SQUARE_DISTANCE =
			Math.abs(this.centerX - point.x) + Math.abs(this.centerY - point.y);
		this.setSpeedX(((point.x - this.centerX) * speed) / SQUARE_DISTANCE);
		this.setSpeedY(((point.y - this.centerY) * speed) / SQUARE_DISTANCE);
		return this;
	}

	/**
	 * Adds a tag to the sprite.
	 * @param {string} tag The tag.
	 * @returns {Sprite} This sprite.
	 */
	addTag(tag) {
		this._tags[tag] = true;
		return this;
	}

	/**
	 * Bounces the sprite from a direction.
	 * @param {Direction} direction The direction.
	 * @returns {Sprite} This sprite.
	 */
	bounceFrom(direction) {
		if (
			(this.speedX < 0 && direction.left) ||
			(this.speedX > 0 && direction.right)
		) {
			this.bounceX();
		}

		if (
			(this.speedY < 0 && direction.top) ||
			(this.speedY > 0 && direction.bottom)
		) {
			this.bounceY();
		}

		return this;
	}

	/**
	 * Bounces the sprite horizontally.
	 * @returns {Sprite} This sprite.
	 */
	bounceX() {
		this.setSpeedX(this.speedX * -1);
		this.x += this.speedX;
		return this;
	}

	/**
	 * Bounces the sprite vertically.
	 * @returns {Sprite} This sprite.
	 */
	bounceY() {
		this.setSpeedY(this.speedY * -1);
		this.y += this.speedY;
		return this;
	}

	/**
	 * Expires the sprite.
	 */
	expire() {
		this.expired = true;
	}

	/**
	 * Gets the collision direction with another sprite.
	 * @param {Sprite} sprite The other sprite.
	 * @returns {Direction} The collision direction.
	 */
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

	/**
	 * Checks if the sprite has a collision with a rectangle.
	 * @param {Rect} rect The rectangle.
	 * @returns {boolean} Whether the sprite has a collision with the rectangle.
	 */
	hasCollision(rect) {
		return !(
			this.left > rect.right ||
			this.right < rect.left ||
			this.top > rect.bottom ||
			this.bottom < rect.top
		);
	}

	/**
	 * Checks if the sprite has a tag.
	 * @param {string} tag The tag.
	 * @returns {boolean} Whether the sprite has the tag.
	 */
	hasTag(tag) {
		return this._tags[tag];
	}

	/**
	 * Initializes the sprite.
	 */
	init() {
		// no default behavior
	}

	/**
	 * Called when the sprite goes off its boundary.
	 */
	offBoundary() {
		this.setExpired();
	}

	/**
	 * Called when the animation of the sprite loops.
	 */
	onAnimationLoop() {
		// no default behavior
	}

	/**
	 * Called when the sprite collides with another sprite.
	 * @param {Sprite} sprite The other sprite.
	 * @returns {Sprite} The other sprite.
	 */
	onCollision(sprite) {
		// no default behavior
		return sprite;
	}

	/**
	 * Pauses the sprite.
	 * @returns {Sprite} This sprite.
	 */
	pause() {
		this._lastSpeedX = this.speedX;
		this._lastSpeedY = this.speedY;
		this.speedX = 0;
		this.speedY = 0;
		return this;
	}

	/**
	 * Renders the sprite.
	 * @param {CanvasRenderingContext2D} context The rendering context.
	 * @returns {boolean} Whether the sprite was rendered.
	 */
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

	/**
	 * Resumes the sprite.
	 * @returns {Sprite} This sprite.
	 */
	resume() {
		this.speedX = this._lastSpeedX;
		this.speedY = this._lastSpeedY;
		return this;
	}

	/**
	 * Stops the sprite.
	 */
	stop() {
		this._lastSpeedX = 0;
		this._lastSpeedY = 0;
		this.speedX = 0;
		this.speedY = 0;
	}

	/**
	 * Synchronizes the sprite.
	 * @returns {boolean} Whether the sprite has expired.
	 */
	sync() {
		this._lastX = this.x;
		this._lastY = this.y;
		this.update();

		if (++this._tick == this.expiration) {
			this.setExpired();
		}

		if (this.expired) {
			return true;
		}

		if (this._animation && this._animation.sync()) {
			this.onAnimationLoop();
		}

		this.x += this.speedX;
		this.y += this.speedY;
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

		if (this.boundary && !this.hasCollision(this.boundary)) {
			this.offBoundary();
		}

		return false;
	}

	/**
	 * Updates the sprite.
	 */
	update() {
		// no default behavior
	}

	/**
	 * Zooms the sprite.
	 * @param {number} ratio The zoom ratio.
	 * @returns {Sprite} This sprite.
	 */
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
