"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Touch = void 0;
const Point_ts_1 = require("./Point.ts");
class Touch extends Point_ts_1.Point {
    constructor(event) {
        super();
        event.preventDefault();
        this._isDown = true;
        this.updateCoordinates(event);
        addEventListener('touchend', (event) => {
            event.preventDefault();
            this._isDown = false;
            this.updateCoordinates(event);
        }, false);
        addEventListener('touchmove', (event) => {
            event.preventDefault();
            this.updateCoordinates(event);
        }, false);
        addEventListener('touchstart', () => {
            event.preventDefault();
            this._isDown = true;
            this.updateCoordinates(event);
        }, false);
    }
    get command() {
        return this._isDown;
    }
    updateCoordinates(event) {
        const TOUCHES = event.changedTouches;
        const TOUCH = TOUCHES[0];
        this.x = TOUCH.pageX;
        this.y = TOUCH.pageY;
    }
}
exports.Touch = Touch;
//# sourceMappingURL=Touch.js.map