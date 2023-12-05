"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const Command_ts_1 = require("./Command.ts");
class Controller {
    constructor() {
        this.tolerance = 0;
        this._active = {};
        this._device = null;
        this._hold = {};
        this._sequence = [];
        this._tick = 0;
    }
    didPerform(commands) {
        for (let i = 1; i <= commands.length; ++i) {
            if (this._sequence[this._sequence.length - i] != commands[commands.length - i]) {
                return false;
            }
        }
        this._sequence = [];
        return true;
    }
    keyDown(command) {
        return this._active[command];
    }
    keyPush(command) {
        return this._active[command] && !this._hold[command];
    }
    setDevice(device) {
        this._device = device;
    }
    update() {
        if (!this._device) {
            return;
        }
        this._hold = {};
        const LAST = this._active;
        this._active = this._device.commands;
        for (let i in this._active) {
            if (LAST[i]) {
                this._hold[i] = true;
            }
        }
        if (this.tolerance && ++this._tick > this.tolerance) {
            this._sequence = [];
            this._tick = 0;
        }
        for (let i in Command_ts_1.Command) {
            const COMMAND = Command_ts_1.Command[i];
            if (this.keyPush(COMMAND)) {
                this._sequence.push(COMMAND);
                this._tick = 0;
            }
        }
    }
}
exports.Controller = Controller;
//# sourceMappingURL=Controller.js.map