[![code style](https://img.shields.io/badge/code_style-classic-blue.svg)](http://diogoeichert.github.io/eslint-config-classic)
[![downloads](https://img.shields.io/npm/dt/core.svg)](https://www.npmjs.com/package/core)
[![license](https://img.shields.io/github/license/diogoeichert/core.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/core.svg)](https://www.npmjs.com/package/core)

# core
Multi-platform multimedia engine

*"Everything should be made as simple as possible, but not simpler". - Albert Einstein*

Core is the powerhouse used by [Maragato マラガト](https://maragato.itch.io) titles, among others.

[![Core on mobile devices](https://img.youtube.com/vi/J9ioXAm-qpE/0.jpg)](https://www.youtube.com/watch?v=J9ioXAm-qpE)

## Concept
Games are made of scenes, which contain sprites. The engine needs at least one scene to be initialized. That's it.

## Features
- collision detection: translated to events, to keep update logic clean
- image cache: assets and their transformations are reused automatically
- user input: human interaction is abstracted via controllers and pointers
- virtual resolution: internal geometry free the app logic from displays

## Installing
### Node.js
```
npm install core
```
then
```
<script src="node_modules/core/core.js"></script>
<script src="node_modules/core/plugin.js"></script>
<script src="app.js"></script>
```

## Usage
- [download core-skel](https://github.com/diogoeichert/core-skel/archive/refs/heads/main.zip) for a kick-start
- refer to [core.js](core.js) and [plugin.js](plugin.js) to see what the API is capable of

## Support
Please consider joining the [discussions](https://github.com/diogoeichert/core/discussions) for collaboration and support.
