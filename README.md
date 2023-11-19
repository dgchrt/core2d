[![code style](https://img.shields.io/badge/code_style-classic-blue.svg)](http://diogoeichert.github.io/eslint-config-classic)
[![downloads](https://img.shields.io/npm/dt/core2d.svg)](https://www.npmjs.com/package/core2d)
[![license](https://img.shields.io/github/license/core2d/core2d.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/core2d.svg)](https://www.npmjs.com/package/core2d)

![core2d logo](core2d.png)

# About
Core2D is the powerhouse used by [Maragato マラガト](https://maragato.itch.io) apps, among others. It is the evolution of Videogame, which in turn was the evolution of Quick. In its current form, it adopts [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), leveraging the full power of [Object-oriented programming](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_programming).

## Concept
Apps created with Core2D are made of one or more [scenes](src/Scene.mjs), which may contain one or more [sprites](src/Sprite.mjs). These objects have properties that can be customized to shape their behavior. It's that simple.

# Get Started
[Download](https://github.com/diogoeichert/core2d-skel/archive/refs/heads/main.zip) or clone/fork the [skeleton project](https://github.com/diogoeichert/core2d-skel/) to start building your app. Alternatively, the library can be also installed to your existing/new project:
```shell
npm install core2d
```

## Learn
The best way to learn is by doing, and you can see what Core2D is capable of through existing open-sourced apps:
- [Alpha](https://github.com/diogoeichert/alpha) - Single-player platform game
- [Cityscape](https://github.com/diogoeichert/cityscape) - Single-player arcade survival game

Also check the [Hall of Fame](#hall-of-fame) below for more source code.

## Support
Please consider joining the [Discord server](https://discord.com/channels/1175074188210491433/1175074189733011478) or the [IRC channel](https://web.libera.chat/#core2d) for collaboration and support.

# Features

## Collision Detection
Translated to callbacks, to keep update logic clean.

## Assets Caching
Assets and their transformations are reused automatically to keep a solid performance.

## User Input
Human interaction is unified via abstractions, so that apps will just work, regardless of the devices in use.

### Controllers
![controllers](controller.png)

Gamepads or keyboard. When using a keyboard, sensible defaults (minding accessibility) are used, as seen in [KeyMap.mjs](https://github.com/diogoeichert/core2d/blob/main/src/KeyMap.mjs).

### Pointers
![pointer](pointer.png)

Mice or touch screen.

## Virtual Resolution
Internal geometry frees the app logic from displays, i.e. your app can have an internal logic resolution of 800x600, while running on any display size.

# Contributing
The core of the library (under `src/`) should remain agnostic and lean. Updates to the core library are usually related to technology developments in the platform (web API advances), while staying true to the basic concepts of the library, which are common to all apps.

Opinionated functionality should be implemented in the form of a plugin (under `src/plugin/`). Plugins can add features that are domain driven, such as elements that can be reused by multiple apps, but not necessarily by every app.

# Hall of Fame
Apps created with Core2D:
- [Asteroids Remake](https://chamun.github.io/asteroids-remake/) ([source](https://github.com/chamun/asteroids-remake))
- [Cucurbita's Halloween](https://www.kongregate.com/games/bbastudios/cucurbitas-halloween)
- [Dragonfire](http://staudt.github.io/dragonfire) ([source](https://github.com/staudt/dragonfire))
- [Fighter Champion](https://rawgit.com/csfeijo/fighter-champion/master/index.html) ([source](https://github.com/csfeijo/fighter-champion))
- [Missile Commander](http://staudt.github.io/missile-commander/) ([source](https://github.com/staudt/missile-commander))
- [Quick Camera](https://staudt.github.io/quick-camera/) ([source](https://github.com/staudt/quick-camera))
- [Raycaster](https://staudt.github.io/raycaster/) ([source](https://github.com/staudt/raycaster))
- [Super Breakout Bros.](https://staudt.github.io/SuperBreakoutBros/) ([source](https://github.com/staudt/SuperBreakoutBros))
- [Tower Defense](https://danielcolnaghi.github.io/towerdefense) ([source](https://github.com/danielcolnaghi/towerdefense))

*"Everything should be made as simple as possible, but not simpler". - Albert Einstein*
