"use strict";

import assert from "assert";

import { ACL } from "../src/ACL.ts";

assert.notEqual(typeof(ACL.document), "undefined");
assert.notEqual(typeof(ACL.window), "undefined");
