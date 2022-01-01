[![code style](https://img.shields.io/badge/code_style-classic-blue.svg)](http://diogoeichert.github.io/eslint-config-classic)
[![downloads](https://img.shields.io/npm/dt/core2d.svg)](https://www.npmjs.com/package/core2d)
[![license](https://img.shields.io/github/license/diogoeichert/core2d.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/core2d.svg)](https://www.npmjs.com/package/core2d)

# core2d
Multiplatform game engine

*"Everything should be made as simple as possible, but not simpler". - Albert Einstein*

Core2D is the powerhouse used by [Maragato マラガト](https://maragato.itch.io) titles, among others.

[![Core2D on mobile devices](https://img.youtube.com/vi/J9ioXAm-qpE/0.jpg)](https://www.youtube.com/watch?v=J9ioXAm-qpE)

## Concept
Games are made of scenes, which contain sprites. The engine needs at least one scene to be initialized. That's it.

## Features
- collision detection: translated to events, to keep update logic clean
- image cache: assets and their transformations are reused automatically
- user input: human interaction is abstracted via controllers and pointers
- virtual resolution: internal geometry free the game logic from displays

## Installing
### Node.js
```
npm install core2d
```
then
```
<script src="node_modules/core2d/core2d.js"></script>
<script src="node_modules/core2d/plugin.js"></script>
<script src="game.js"></script>
```

## Usage
- [download core2d-skel](https://github.com/diogoeichert/core2d-skel/archive/refs/heads/main.zip) for a kick-start
- refer to [core2d.js](core2d.js) and [plugin.js](plugin.js) to see what the API is capable of

## Support
Please consider joining the [discussions](https://github.com/diogoeichert/core2d/discussions) for collaboration and support.
