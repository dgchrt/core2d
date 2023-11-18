[![code style](https://img.shields.io/badge/code_style-classic-blue.svg)](http://diogoeichert.github.io/eslint-config-classic)
[![discord](https://img.shields.io/discord/1175074188210491433)](https://discord.com/channels/1175074188210491433/1175074189733011478)
[![downloads](https://img.shields.io/npm/dt/core2d.svg)](https://www.npmjs.com/package/core2d)
[![license](https://img.shields.io/github/license/core2d/core2d.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/core2d.svg)](https://www.npmjs.com/package/core2d)

![core2d logo](core2d.png)

Core2D is the powerhouse used by [Maragato マラガト](https://maragato.itch.io) apps, among others. It is the evolution of Videogame, which in turn was the evolution of Quick. In its current form, it adopts JavaScript modules, leveraging the full power of object-oriented programming.

## Concept
Apps created with Core2D are made of one or more [scenes](src/Scene.mjs), which may contain one or more [sprites](src/Sprite.mjs). It's that simple.

## Features
### Collision Detection
Translated to method calls, to keep update logic clean.
### Image Cache
Assets and their transformations are reused automatically to keep a solid performance.
### User Input
Human interaction is abstracted via controllers (gamepads or keyboard) and pointers (mouse or touch screens), so that apps will just work, regardless of the devices in use.
### Virtual Resolution
Internal geometry frees the app logic from displays, i.e. your app can have an internal logic resolution of 800x600, while running on any display size.

## Installing
```shell
npm install core2d
```

## Usage
Clone the [skeleton](https://github.com/diogoeichert/core2d-skel) app for a quick start.

Learn by example, through open-sourced apps:
- [Alpha](https://github.com/diogoeichert/alpha) - Single-player platform game
- [Cityscape](https://github.com/diogoeichert/cityscape) - Single-player arcade survival game

## Support
Please consider joining the [Discord server](https://discord.com/channels/1175074188210491433/1175074189733011478) or the [IRC channel](https://web.libera.chat/#core2d) for collaboration and support.

## Contributing
The core of the library (under `src/`) should remain agnostic and lean. Updates to the core library are usually related to technology developments in the platform (web API advances), while staying true to the basic concepts of the library, which are common to all apps.

Opinionated functionality should be implemented in the form of a plugin (under `src/plugin/`). Plugins can add features that are domain driven, such as elements that can be reused by multiple apps, but not necessarily by every app.

*"Everything should be made as simple as possible, but not simpler". - Albert Einstein*

## Hall of Fame
Apps created with Core2D:
- [Asteroids Remake](https://github.com/chamun/asteroids-remake)
- [Cucurbita's Halloween](https://www.kongregate.com/games/bbastudios/cucurbitas-halloween)
- [Dragonfire](https://github.com/staudt/dragonfire)
- [Fighter Champion](https://github.com/csfeijo/fighter-champion)
- [Missile Commander](https://github.com/staudt/missile-commander)
- [Quick Camera](https://github.com/staudt/quick-camera)
- [Raycaster](https://github.com/staudt/raycaster)
- [Super Breakout Bros.](https://github.com/staudt/SuperBreakoutBros)
- [Tower Defense](https://github.com/danielcolnaghi/towerdefense)
