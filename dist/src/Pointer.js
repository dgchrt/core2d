"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pointer = void 0;
const Engine_ts_1 = require("./Engine.ts");
const Point_ts_1 = require("./Point.ts");
class Pointer extends Point_ts_1.Point {
    constructor() {
        super();
        this._active = false;
        this._device = null;
        this._hold = false;
    }
    get down() {
        return this._active;
    }
    get push() {
        return this._active && !this._hold;
    }
    setDevice(device) {
        this._device = device;
    }
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
        const REAL_X = this._device.x - Engine_ts_1.Engine.offsetLeft;
        const REAL_Y = this._device.y - Engine_ts_1.Engine.offsetTop;
        this.x = Math.floor(REAL_X * Engine_ts_1.Engine.width / Engine_ts_1.Engine.realWidth);
        this.y = Math.floor(REAL_Y * Engine_ts_1.Engine.height / Engine_ts_1.Engine.realHeight);
    }
}
exports.Pointer = Pointer;
