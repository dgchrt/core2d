"use strict";

/**
 * Sets up the environment based on its runtime (browser or not).
 */
if (typeof global != "undefined") {
  global.addEventListener = () => {};

  global.document = {
    createElement: (name) => {
      if (name == "canvas") {
        return {
          getContext: () => {
            return {
              measureText: (text) => {
                return {
                  width: text.length,
                };
              },
            };
          },
        };
      }
    },
    getElementById: (id) => {
      if (id == "app") {
        return {
          focus: () => {},
          getContext: () => {
            return {
              fillRect: () => {},
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
    },
  };

  global.localStorage = {};

  /**
   * For older Node.js versions.
   */
  if (!global.navigator) {
    global.navigator = {};
  }

  global.window = {
    focus: () => {},
    innerHeight: 600,
    innerWidth: 800,
    requestAnimationFrame: () => true,
  };
}

/**
 * Anti-Corruption Layer, to be used instead of direct API calls.
 */
export const ACL = {
  document,
  window,
};
