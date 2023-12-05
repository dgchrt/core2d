"use strict";
"use sttrict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Keyboard = void 0;
const KeyMap_ts_1 = require("./KeyMap.ts");
class Keyboard {
    constructor(event) {
        this._buffer = {};
        this.onKey(event, true);
        addEventListener("keydown", event => this.onKey(event, true), false);
        addEventListener("keyup", event => this.onKey(event, false), false);
    }
    get commands() {
        const RESULT = {};
        for (let i in this._buffer) {
            if (this._buffer[i]) {
                RESULT[i] = true;
            }
        }
        return RESULT;
    }
    onKey(event, isDown) {
        const COMMAND = KeyMap_ts_1.KeyMap[event.keyCode];
        this._buffer[COMMAND] = isDown;
        if (isDown && "number" == typeof (COMMAND)) {
            event.preventDefault();
        }
    }
}
exports.Keyboard = Keyboard;
