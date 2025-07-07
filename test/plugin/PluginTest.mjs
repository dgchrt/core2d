"use strict";

import { BaseTile } from "../src/plugin/BaseTile.mjs";
import { ClickableSprite } from "../src/plugin/ClickableSprite.mjs";
import { ControllableSprite } from "../src/plugin/ControllableSprite.mjs";
import { CursorSprite } from "../src/plugin/CursorSprite.mjs";
import { Fog } from "../src/plugin/Fog.mjs";
import { FontSprite } from "../src/plugin/FontSprite.mjs";
import { JumperSprite } from "../src/plugin/JumperSprite.mjs";
import { RandomRectTransition } from "../src/plugin/RandomRectTransition.mjs";
import { Starfield } from "../src/plugin/Starfield.mjs";
import { Scene } from "../src/Scene.mjs";

// BaseTile
new BaseTile("image");

// ClickableSprite
let clickableSprite = new ClickableSprite();
clickableSprite.onClick();

// ControllableSprite
let controllableSprite = new ControllableSprite();
controllableSprite.onUp();
controllableSprite.onDown();
controllableSprite.onLeft();
controllableSprite.onRight();
controllableSprite.onA();
controllableSprite.onB();
controllableSprite.onX();
controllableSprite.onY();
controllableSprite.onStart();
controllableSprite.onSelect();

// CursorSprite
new CursorSprite();

// Fog
new Fog(new Scene());

// FontSprite
new FontSprite("text");

// JumperSprite
let jumperSprite = new JumperSprite();
jumperSprite.jump(10);

// RandomRectTransition
let randomRectTransition = new RandomRectTransition();
randomRectTransition.scene = new Scene();
randomRectTransition.init();
randomRectTransition.sync();

// Starfield
new Starfield(new Scene());
