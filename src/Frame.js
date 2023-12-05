"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Frame = void 0;
const Static_ts_1 = require("./Static.ts");
class Frame {
    constructor(image, duration = 0) {
        this._image = Static_ts_1.Static.getImage(image);
        this._duration = duration;
    }
    get image() {
        return this._image;
    }
    get duration() {
        return this._duration;
    }
    get width() {
        return this._image.width;
    }
    get height() {
        return this._image.height;
    }
}
exports.Frame = Frame;
//# sourceMappingURL=Frame.js.map