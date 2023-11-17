# core2d
Multi-platform 2D interaction engine

[![code style](https://img.shields.io/badge/code_style-classic-blue.svg)](http://diogoeichert.github.io/eslint-config-classic)
[![downloads](https://img.shields.io/npm/dt/core2d.svg)](https://www.npmjs.com/package/core2d)
[![license](https://img.shields.io/github/license/core2d/core2d.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/core2d.svg)](https://www.npmjs.com/package/core2d)

![core2d logo](core2d.png)

Core2D is the powerhouse used by [Maragato マラガト](https://maragato.itch.io) apps, among others.

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

## Support
Please consider joining the [discussions](https://github.com/core2d/core2d/discussions) for collaboration and support.

## Contributing
The core of the library (under `src/`) should remain agnostic and lean. Updates to the core library are usually related to technology developments in the platform (web API advances), while staying true to the basic concepts of the library, which are common to all apps.

Opinionated functionality should be implemented in the form of a plugin (under `src/plugin/`). Plugins can add features that are domain driven, such as elements that can be reused by multiple apps, but not necessarily by every app.

*"Everything should be made as simple as possible, but not simpler". - Albert Einstein*
