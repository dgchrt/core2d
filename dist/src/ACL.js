"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACL = void 0;
/**
 * Sets up the environment based on its runtime (browser or not).
 */
if (typeof (global) != "undefined") {
    global.addEventListener = () => { };
    global.document = {
        getElementById: (id) => {
            if (id == "game") {
                return {
                    focus: () => { },
                    getContext: () => {
                        return {
                            fillRect: () => { },
                        };
                    },
                    height: 400,
                    offsetLeft: 0,
                    offsetTop: 0,
                    style: {},
                    width: 640,
                };
            }
            return {};
        },
        getElementsByTagName: () => {
            return [];
        }
    };
    global.localStorage = {};
    /**
     * For older Node.js versions.
     */
    if (!global.navigator) {
        global.navigator = {};
    }
    global.window = {
        focus: () => { },
        innerHeight: 600,
        innerWidth: 800,
        requestAnimationFrame: () => true
    };
}
/**
 * Anti-Corruption Layer, to be used instead of direct API calls.
 */
exports.ACL = {
    document,
    window,
};
