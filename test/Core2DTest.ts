"use strict";

import assert from "assert";

import { Core2D } from "../src/Core2D.ts";
import { Scene } from "../src/Scene.ts";

// init
try {
  Core2D.init();
} catch (e) {
  assert.strictEqual(e.message, "Could not get the next scene");
}

let scene = new Scene();
Core2D.init(scene);

// load without saved data
assert.strictEqual(Core2D.load(), undefined);

// save then load data
assert.strictEqual(Core2D.save({ level: 1 }), undefined);
assert.strictEqual(JSON.stringify(Core2D.load()), JSON.stringify({ level: 1 }));

// clear saved data
assert.strictEqual(Core2D.save(), undefined);
assert.strictEqual(Core2D.load(), undefined);

// save then load data with namespace
assert.strictEqual(Core2D.save({ lives: 1 }, "namespace"), undefined);
assert.strictEqual(JSON.stringify({ lives: 1 }), JSON.stringify(Core2D.load("namespace")));
