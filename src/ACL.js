"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACL = void 0;
if (typeof (global) != 'undefined') {
    global.addEventListener = () => { };
    global.document = {
        getElementById: (id) => {
            if (id == 'game') {
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
    if (!global.localStorage) {
        global.localStorage = {};
    }
    if (!global.navigator) {
        global.navigator = {};
    }
    global.window = {
        focus: () => { },
        innerHeight: 600,
        innerWidth: 800,
        requestAnimationFrame: () => 1
    };
}
exports.ACL = {
    document,
    window,
};
//# sourceMappingURL=ACL.js.map