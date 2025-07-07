"use strict";

import { Engine } from "./Engine.mjs";
import { Point } from "./Point.mjs";

/**
 * Represents a pointer, which can be a mouse or a touch.
 * @extends Point
 */
export class Pointer extends Point {
  /**
   * Creates a new Pointer.
   */
  constructor() {
    super();
    this._active = false;
    this._device = null;
    this._hold = false;
  }

  /**
   * Whether the pointer is down.
   * @type {boolean}
   */
  get down() {
    return this._active;
  }

  /**
   * Whether the pointer was just pushed.
   * @type {boolean}
   */
  get push() {
    return this._active && !this._hold;
  }

  /**
   * Sets the device of the pointer.
   * @param {object} device The device.
   */
  setDevice(device) {
    this._device = device;
  }

  /**
   * Updates the pointer.
   */
  update() {
    if (!this._device) {
      return;
    }

    this._hold = false;
    const LAST = this._active;
    this._active = this._device.command;

    if (this._active && LAST) {
      this._hold = true;
    }

    const REAL_X = this._device.x - Engine.offsetLeft;
    const REAL_Y = this._device.y - Engine.offsetTop;
    this.x = Math.floor((REAL_X * Engine.width) / Engine.realWidth);
    this.y = Math.floor((REAL_Y * Engine.height) / Engine.realHeight);
  }
}
