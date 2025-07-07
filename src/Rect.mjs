"use strict";

import { Point } from "./Point.mjs";

/**
 * Represents a rectangle.
 * @extends Point
 */
export class Rect extends Point {
  /**
   * Creates a new Rect.
   * @param {number} x The x-coordinate of the rectangle.
   * @param {number} y The y-coordinate of the rectangle.
   * @param {number} [width=0] The width of the rectangle.
   * @param {number} [height=0] The height of the rectangle.
   */
  constructor(x, y, width = 0, height = 0) {
    super(x, y);
    this.width = width;
    this.height = height;
  }

  /**
   * The x-coordinate of the left edge of the rectangle.
   * @type {number}
   */
  get left() {
    return this.x;
  }

  /**
   * The x-coordinate of the right edge of the rectangle.
   * @type {number}
   */
  get right() {
    return this.x + this.width - 1;
  }

  /**
   * The y-coordinate of the top edge of the rectangle.
   * @type {number}
   */
  get top() {
    return this.y;
  }

  /**
   * The y-coordinate of the bottom edge of the rectangle.
   * @type {number}
   */
  get bottom() {
    return this.y + this.height - 1;
  }

  /**
   * The x-coordinate of the center of the rectangle.
   * @type {number}
   */
  get centerX() {
    return this.x + Math.floor(this.width / 2);
  }

  /**
   * The y-coordinate of the center of the rectangle.
   * @type {number}
   */
  get centerY() {
    return this.y + Math.floor(this.height / 2);
  }

  /**
   * The center of the rectangle.
   * @type {Point}
   */
  get center() {
    return new Point(this.centerX, this.centerY);
  }

  /**
   * Sets the width of the rectangle.
   * @param {number} width The new width.
   * @returns {Rect} This rectangle.
   */
  setWidth(width) {
    this.width = width;
    return this;
  }

  /**
   * Sets the height of the rectangle.
   * @param {number} height The new height.
   * @returns {Rect} This rectangle.
   */
  setHeight(height) {
    this.height = height;
    return this;
  }

  /**
   * Sets the size of the rectangle.
   * @param {Rect} rect The new size.
   * @returns {Rect} This rectangle.
   */
  setSize(rect) {
    this.setWidth(rect.width);
    this.setHeight(rect.height);
    return this;
  }

  /**
   * Sets the x-coordinate of the left edge of the rectangle.
   * @param {number} x The new x-coordinate.
   * @returns {Rect} This rectangle.
   */
  setLeft(x) {
    this.x = x;
    return this;
  }

  /**
   * Sets the x-coordinate of the right edge of the rectangle.
   * @param {number} x The new x-coordinate.
   * @returns {Rect} This rectangle.
   */
  setRight(x) {
    this.x = x - this.width + 1;
    return this;
  }

  /**
   * Sets the y-coordinate of the top edge of the rectangle.
   * @param {number} y The new y-coordinate.
   * @returns {Rect} This rectangle.
   */
  setTop(y) {
    this.y = y;
    return this;
  }

  /**
   * Sets the y-coordinate of the bottom edge of the rectangle.
   * @param {number} y The new y-coordinate.
   * @returns {Rect} This rectangle.
   */
  setBottom(y) {
    this.y = y - this.height + 1;
    return this;
  }

  /**
   * Sets the x-coordinate of the center of the rectangle.
   * @param {number} x The new x-coordinate.
   * @returns {Rect} This rectangle.
   */
  setCenterX(x) {
    this.x = x - Math.floor(this.width / 2);
    return this;
  }

  /**
   * Sets the y-coordinate of the center of the rectangle.
   * @param {number} y The new y-coordinate.
   * @returns {Rect} This rectangle.
   */
  setCenterY(y) {
    this.y = y - Math.floor(this.height / 2);
    return this;
  }

  /**
   * Sets the center of the rectangle.
   * @param {Point} point The new center.
   * @returns {Rect} This rectangle.
   */
  setCenter(point) {
    this.setCenterX(point.x);
    this.setCenterY(point.y);
    return this;
  }

  /**
   * The x-coordinate of the left edge of the rectangle.
   * @type {number}
   */
  set left(x) {
    this.setLeft(x);
  }

  /**
   * The x-coordinate of the right edge of the rectangle.
   * @type {number}
   */
  set right(x) {
    this.setRight(x);
  }

  /**
   * The y-coordinate of the top edge of the rectangle.
   * @type {number}
   */
  set top(y) {
    this.setTop(y);
  }

  /**
   * The y-coordinate of the bottom edge of the rectangle.
   * @type {number}
   */
  set bottom(y) {
    this.setBottom(y);
  }

  /**
   * The x-coordinate of the center of the rectangle.
   * @type {number}
   */
  set centerX(x) {
    this.setCenterX(x);
  }

  /**
   * The y-coordinate of the center of the rectangle.
   * @type {number}
   */
  set centerY(y) {
    this.setCenterY(y);
  }

  /**
   * The center of the rectangle.
   * @type {Point}
   */
  set center(point) {
    this.setCenter(point);
  }

  /**
   * Creates a new rectangle that is the union of this rectangle and another rectangle.
   * @param {Rect} rect The other rectangle.
   * @returns {Rect} The new rectangle.
   */
  makeUnion(rect) {
    const RECT = new Rect(Math.min(this.x, rect.x), Math.min(this.y, rect.y));

    return RECT.setWidth(
      Math.max(this.right, rect.right) - RECT.x + 1
    ).setHeight(Math.max(this.bottom, rect.bottom) - RECT.y + 1);
  }
}
