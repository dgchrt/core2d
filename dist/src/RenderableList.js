"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderableList = void 0;
class RenderableList {
    constructor() {
        this._elements = [];
    }
    add(renderable) {
        this._elements.push(renderable);
    }
    render(context) {
        for (let i = 0; i < this._elements.length; ++i) {
            this._elements[i].render(context);
        }
        this._elements.length = 0;
    }
}
exports.RenderableList = RenderableList;
