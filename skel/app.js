"use strict";

/* global core2d */

const Color = core2d.Color;
const Command = core2d.Command;
const ControllableSprite = core2d.plugin.ControllableSprite;
const Starfield = core2d.plugin.Starfield;
const TextSprite = core2d.TextSprite;
const Core2D = core2d.Core2D;

let scene = Core2D.scene()
	.setColor(Color.Navy);

const starfield = new Starfield()
	.setSpeedX(-1)
	.setSpeedY(1);

const score = new TextSprite()
	.setWidth(16)
	.setHeight(16)
	.setRight(scene.right)
	.setTop(scene.top);

const user = new ControllableSprite()
	.setWidth(32)
	.setHeight(32)
	.setColor(Color.Yellow)
	.setSolid();

user.update = () => {
	if (user.controller.didPerform([Command.LEFT, Command.RIGHT, Command.LEFT, Command.RIGHT, Command.B, Command.A])) {
		user.center = loot.center;
	}

	if (user.controller.keyDown(Command.A)) {
		user.step = 4;
	} else {
		user.step = 2;
	}
};

const loot = Core2D.sprite()
	.setWidth(16)
	.setHeight(16)
	.setCenter(scene.center)
	.setColor(Color.Green)
	.setSolid();

loot.onCollision = () => {
	++score.text;
	loot.centerX = Core2D.random(scene.width);
	loot.centerY = Core2D.random(scene.height);
};

scene.add(starfield);
scene.add(score);
scene.add(user);
scene.add(loot);
score.text = 0;
Core2D.setName("My App");
Core2D.init(scene);
