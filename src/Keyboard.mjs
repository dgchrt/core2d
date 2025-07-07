"use sttrict";

import { KeyMap } from "./KeyMap.mjs";

export class Keyboard {
  constructor(event) {
    this._buffer = {};

    this.onKey(event, true);
    addEventListener("keydown", (event) => this.onKey(event, true), false);
    addEventListener("keyup", (event) => this.onKey(event, false), false);
  }

  get commands() {
    const RESULT = {};

    for (let i in this._buffer) {
      if (this._buffer[i]) {
        RESULT[i] = true;
      }
    }

    return RESULT;
  }

  onKey(event, isDown) {
    const COMMAND = KeyMap[event.keyCode];
    this._buffer[COMMAND] = isDown;

    if (isDown && "number" == typeof COMMAND) {
      event.preventDefault();
    }
  }
}
