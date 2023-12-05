"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const Core2D_ts_1 = require("../src/Core2D.ts");
const Scene_ts_1 = require("../src/Scene.ts");
// init
try {
    Core2D_ts_1.Core2D.init();
}
catch (e) {
    assert_1.default.strictEqual(e.message, "Could not get the next scene");
}
let scene = new Scene_ts_1.Scene();
Core2D_ts_1.Core2D.init(scene);
// load without saved data
assert_1.default.strictEqual(Core2D_ts_1.Core2D.load(), undefined);
// save then load data
assert_1.default.strictEqual(Core2D_ts_1.Core2D.save({ level: 1 }), undefined);
assert_1.default.strictEqual(JSON.stringify(Core2D_ts_1.Core2D.load()), JSON.stringify({ level: 1 }));
// clear saved data
assert_1.default.strictEqual(Core2D_ts_1.Core2D.save(), undefined);
assert_1.default.strictEqual(Core2D_ts_1.Core2D.load(), undefined);
// save then load data with namespace
assert_1.default.strictEqual(Core2D_ts_1.Core2D.save({ lives: 1 }, "namespace"), undefined);
assert_1.default.strictEqual(JSON.stringify({ lives: 1 }), JSON.stringify(Core2D_ts_1.Core2D.load("namespace")));
//# sourceMappingURL=Core2DTest.js.map