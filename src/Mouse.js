"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mouse = void 0;
const Point_ts_1 = require("./Point.ts");
class Mouse extends Point_ts_1.Point {
    constructor(event) {
        super();
        this.updateCoordinates(event);
        addEventListener('mousedown', (event) => {
            event.preventDefault();
            this._isDown = true;
        }, false);
        addEventListener('mousemove', (event) => {
            this.updateCoordinates(event);
        }, false);
        addEventListener('mouseup', (event) => {
            event.preventDefault();
            this._isDown = false;
        }, false);
    }
    get command() {
        return this._isDown;
    }
    updateCoordinates(event) {
        var _a, _b, _c, _d;
        event.preventDefault();
        this.x = (_b = (_a = event.x) !== null && _a !== void 0 ? _a : event.clientX) !== null && _b !== void 0 ? _b : 0;
        this.y = (_d = (_c = event.y) !== null && _c !== void 0 ? _c : event.clientY) !== null && _d !== void 0 ? _d : 0;
    }
}
exports.Mouse = Mouse;
//# sourceMappingURL=Mouse.js.map