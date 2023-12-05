"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const ACL_ts_1 = require("../src/ACL.ts");
assert_1.default.notEqual(typeof (ACL_ts_1.ACL.document), "undefined");
assert_1.default.notEqual(typeof (ACL_ts_1.ACL.window), "undefined");
//# sourceMappingURL=ACLTest.js.map