"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const Scene_ts_1 = require("../src/Scene.ts");
const Sprite_ts_1 = require("../src/Sprite.ts");
let subject = new Scene_ts_1.Scene();
// add sprites
subject.add(new Sprite_ts_1.Sprite().addTag("test"));
// get objects with tag
assert_1.default.strictEqual(1, subject.getObjectsWithTag("test").length);
assert_1.default.strictEqual(0, subject.getObjectsWithTag("blah").length);
// build empty tiles
subject.build([["a", "b", "c"], ["d", "e", "f"]], () => null, 0, 0, 0, 0);
