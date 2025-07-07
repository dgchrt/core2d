"use strict";

/**
 * Represents a point with x and y coordinates.
 */
export class Point {
	/**
	 * Creates a new Point.
	 * @param {number} [x=0] The x-coordinate.
	 * @param {number} [y=0] The y-coordinate.
	 */
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	/**
	 * The position of the point.
	 * @type {Point}
	 */
	get position() {
		return this;
	}

	/**
	 * Sets the x-coordinate of the point.
	 * @param {number} x The x-coordinate.
	 * @returns {Point} This point.
	 */
	setX(x) {
		this.x = x;
		return this;
	}

	/**
	 * Sets the y-coordinate of the point.
	 * @param {number} y The y-coordinate.
	 * @returns {Point} This point.
	 */
	setY(y) {
		this.y = y;
		return this;
	}

	/**
	 * Sets the position of the point.
	 * @param {Point} point The new position.
	 * @returns {Point} This point.
	 */
	setPosition(point) {
		this.x = point.x;
		this.y = point.y;
		return this;
	}

	/**
	 * The position of the point.
	 * @type {Point}
	 */
	set position(point) {
		this.setPosition(point);
	}

	/**
	 * Calculates the distance to another point.
	 * @param {Point} point The other point.
	 * @returns {number} The distance to the other point.
	 */
	distance(point) {
		const dx = point.x - this.x;
		const dy = point.y - this.y;
		return Math.sqrt(dx * dx + dy * dy);
	}
}
