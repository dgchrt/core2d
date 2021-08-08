[![code style](https://img.shields.io/badge/code_style-classic-blue.svg)](http://diogoeichert.github.io/eslint-config-classic)
[![downloads](https://img.shields.io/npm/dt/videogame.svg)](https://www.npmjs.com/package/videogame)
[![license](https://img.shields.io/github/license/diogoeichert/videogame.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/videogame.svg)](https://www.npmjs.com/package/videogame)

# videogame
Multiplatform game engine

*"Everything should be made as simple as possible, but not simpler". - Albert Einstein*

Videogame is the powerhouse used by [Maragato マラガト](https://maragato.itch.io) titles, among others.

## Concept
Games are made of scenes, which contain sprites. The engine needs at least one scene to be initialized. That's it.

## Features
- collision detection: translated to event, to keep update logic clean
- image cache: assets and their transformations are reused automatically
- user input: human interaction is abstracted via controllers and pointers
- virtual resolution: internal geometry free the game logic from displays

## Installing
### Node.js
```
npm install videogame
```
then
```
<script src="node_modules/videogame/videogame.js"></script>
<script src="node_modules/videogame/plugin.js"></script>
<script src="game.js"></script>
```

## Usage
- [download videogame-skel](https://github.com/diogoeichert/videogame-skel/archive/refs/heads/main.zip) for a kick-start
- refer to [videogame.js](videogame.js) and [plugin.js](plugin.js) to see what the API is capable of

## Support
Please consider joining the [discussions](https://github.com/diogoeichert/videogame/discussions) for collaboration and support.
