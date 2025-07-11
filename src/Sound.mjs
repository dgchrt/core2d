"use strict";

import { Static } from "./Static.mjs";

const DEFAULT_PLAY_VOLUME = 0.3;

export class Sound {
  constructor() {
    this._isFading = false;
    this._isMute = false;
    this._nextThemeName = null;
    this._queue = {};
    this._theme = null;
    this._themeId = null;
    this._volume = 100;
  }

  fadeOut() {
    if (!this._theme) {
      return;
    }

    this._isFading = true;
    this._volume = 100;
  }

  mute() {
    this._isMute = !this._isMute;

    if (!this._theme) {
      return;
    }

    if (!this._isMute) {
      this._theme.play();
    } else {
      this._theme.pause();
    }
  }

  pause() {
    if (this._theme) {
      this._theme.pause();
    }
  }

  play(id, volume = DEFAULT_PLAY_VOLUME) {
    if (this._isMute) {
      return;
    }

    this._queue[id] = volume;
  }

  playTheme(id) {
    if (id == this._themeId) {
      return;
    }

    if (this._theme && this._theme.currentTime > 0) {
      this._nextThemeName = id;

      if (!this._isFading) {
        this.fadeOut();
      }

      return;
    }

    this.stopTheme();
    this._theme = Static.getElement(id);
    this._themeId = id;

    if (this._theme.currentTime > 0) {
      this._theme.currentTime = 0;
    }

    if (this._isMute) {
      return;
    }

    this._theme.volume = 1;
    this._theme.play();
  }

  resume() {
    if (this._isMute) {
      return;
    }

    if (this._theme.paused) {
      this._theme.play();
    }
  }

  stopTheme() {
    this._isFading = false;

    if (this._theme) {
      this._theme.pause();
      this._theme.currentTime = 0;
      this._themeId = null;
    }
  }

  update() {
    for (let id in this._queue) {
      const SOUND = Static.getElement(id);

      if (!SOUND?.pause) {
        console.warn(`Could not find audio with id: ${id}`);
      }

      SOUND.pause();

      if (SOUND.currentTime > 0) {
        SOUND.currentTime = 0;
      }

      SOUND.volume = this._queue[id];
      SOUND.play();
    }

    this._queue = {};

    if (this._isFading) {
      if (--this._volume > 0) {
        this._theme.volume = this._volume / 100;
      } else {
        this.stopTheme();
        this._isFading = false;
        this._theme = null;

        if (this._nextThemeName) {
          this.playTheme(this._nextThemeName);
          this._themeId = this._nextThemeName;
          this._nextThemeName = null;
        }
      }
    }
  }
}
