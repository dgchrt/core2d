"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyMap = void 0;
const Command_ts_1 = require("./Command.ts");
const Key_ts_1 = require("./Key.ts");
exports.KeyMap = {
    [Key_ts_1.Key.UP]: Command_ts_1.Command.UP,
    [Key_ts_1.Key.E]: Command_ts_1.Command.UP,
    [Key_ts_1.Key.I]: Command_ts_1.Command.UP,
    [Key_ts_1.Key.DOWN]: Command_ts_1.Command.DOWN,
    [Key_ts_1.Key.D]: Command_ts_1.Command.DOWN,
    [Key_ts_1.Key.K]: Command_ts_1.Command.DOWN,
    [Key_ts_1.Key.LEFT]: Command_ts_1.Command.LEFT,
    [Key_ts_1.Key.S]: Command_ts_1.Command.LEFT,
    [Key_ts_1.Key.J]: Command_ts_1.Command.LEFT,
    [Key_ts_1.Key.RIGHT]: Command_ts_1.Command.RIGHT,
    [Key_ts_1.Key.F]: Command_ts_1.Command.RIGHT,
    [Key_ts_1.Key.L]: Command_ts_1.Command.RIGHT,
    [Key_ts_1.Key.SPACE]: Command_ts_1.Command.A,
    [Key_ts_1.Key.ALT]: Command_ts_1.Command.B,
    [Key_ts_1.Key.CTRL]: Command_ts_1.Command.X,
    [Key_ts_1.Key.SHIFT]: Command_ts_1.Command.Y,
    [Key_ts_1.Key.ENTER]: Command_ts_1.Command.START,
    [Key_ts_1.Key.BACK]: Command_ts_1.Command.SELECT,
};
