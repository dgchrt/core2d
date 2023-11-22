"use strict";

/**
 * Class representing a point, which is a position in 2D space.
 *
 * Coordinate x increases to the right in the horizontal axis.
 * Coordinate y increases to the bottom in the vertical axis.
 *
 * (i.e. position 0, 0 lies at the top left corner)
 */
export class Point {
	/**
	 * Creates a new point.
	 *
	 * @param {number} [x] - The x coordinate.
	 * @param {number} [y] - The y coordinate.
	 */
	constructor(x = 0, y = 0) {
		this._x = x;

		/**
		 * The y coordinate.
		 * @member {!number}
		 */
		this.y = y;
	}

	get x() {
		return this._x;
	}

	/**
	 * Sets the x coordinate.
	 *
	 * @param {!number} [x] - The x coordinate.
	 * @returns {Point} The instance itself for method chaining
	 */
	setX(x = 0) {
		this.x = x;
		return this;
	}

	set x(x) {
		this.setX(x);
	}

	get y() {
		return this._y;
	}

	/**
	 * Sets the y coordinate.
	 *
	 * @param {!number} [y] - The y coordinate.
	 * @returns {Point} The instance itself for method chaining
	 */
	setY(y = 0) {
		this.y = y;
		return this;
	}

	set y(y) {
		this.setY(y);
	}

	/**
	 * Sets the position to the specified point.
	 *
	 * @param {!Point} point - A point.
	 * @returns {Point} The instance itself for method chaining
	 */
	setPosition(point) {
		this.x = point.x;
		this.y = point.y;
		return this;
	}

	/**
	 * Sets the position to the specified point.
	 *
	 * @param {!Point} point - A point.
	 */
	set position(point) {
		this.setPosition(point);
	}
}
