"use strict";

import assert from "assert";

import { Scene } from "../src/Scene.mjs";
import { Transition } from "../src/Transition.mjs";

let subject = new Transition();
subject.scene = new Scene();
subject.init();

assert.strictEqual(subject.sync(), false);
