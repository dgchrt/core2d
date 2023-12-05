"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamePad = void 0;
const Axis_ts_1 = require("./Axis.ts");
const Command_ts_1 = require("./Command.ts");
const ButtonLayout_ts_1 = require("./ButtonLayout.ts");
const ButtonLayoutMap_ts_1 = require("./ButtonLayoutMap.ts");
const Input_ts_1 = require("./Input.ts");
const Static_ts_1 = require("./Static.ts");
class GamePad {
    constructor(id = 0) {
        this._id = id;
        this.analogThreshold = 0.5;
        this.layout = ButtonLayout_ts_1.ButtonLayout.standard;
        const MODEL = Static_ts_1.Static.getGamepads()[id].id.toLowerCase();
        for (let id in ButtonLayoutMap_ts_1.ButtonLayoutMap) {
            if (MODEL.includes(id)) {
                this.layout = ButtonLayout_ts_1.ButtonLayout[ButtonLayoutMap_ts_1.ButtonLayoutMap[id]];
            }
        }
    }
    get commands() {
        const BUTTONS = Input_ts_1.Input.getGamePadButtons(this._id);
        const RESULT = {};
        if (Input_ts_1.Input.getGamePadAxes(this._id)[Axis_ts_1.Axis.LEFT_Y] < -this.analogThreshold) {
            RESULT[Command_ts_1.Command.UP] = true;
        }
        else if (Input_ts_1.Input.getGamePadAxes(this._id)[Axis_ts_1.Axis.LEFT_Y] > this.analogThreshold) {
            RESULT[Command_ts_1.Command.DOWN] = true;
        }
        if (Input_ts_1.Input.getGamePadAxes(this._id)[Axis_ts_1.Axis.LEFT_X] < -this.analogThreshold) {
            RESULT[Command_ts_1.Command.LEFT] = true;
        }
        else if (Input_ts_1.Input.getGamePadAxes(this._id)[Axis_ts_1.Axis.LEFT_X] > this.analogThreshold) {
            RESULT[Command_ts_1.Command.RIGHT] = true;
        }
        for (let i in Command_ts_1.Command) {
            const BUTTON = BUTTONS[this.layout[i]];
            if (BUTTON && BUTTON.pressed) {
                RESULT[Command_ts_1.Command[i]] = true;
            }
        }
        return RESULT;
    }
}
exports.GamePad = GamePad;
//# sourceMappingURL=GamePad.js.map