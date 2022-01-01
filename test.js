"use strict";

setup();

// imports
const assert = require("assert");
const core2d = require("./core2d.js");
global.core2d = core2d;
core2d.plugin = require("./plugin.js");

// init
core2d.Core2D.init(new core2d.Scene());

// run core2d tests
animationTest();
controllerTest();
frameTest();
initTest();
pointTest();
pointerTest();
rectTest();
sceneTest();
spriteTest();
textSpriteTest();
core2dTest();

// run plugin tests
fontSpriteTest();

// core2d tests
function animationTest() {
	let subject;

	const IMAGE1 = {
		width: 1,
		height: 2,
	};

	const IMAGE2 = {
		width: 3,
		height: 4,
	};

	const FRAMES = [
		new core2d.Frame(IMAGE1, 1),
		new core2d.Frame(IMAGE2, 2),
	];

	// constructor
	subject = new core2d.Animation(FRAMES);
	assert.strictEqual(subject.image, IMAGE1);
	assert.strictEqual(subject.width, IMAGE1.width);
	assert.strictEqual(subject.height, IMAGE1.height);
	assert.strictEqual(subject.sync(), false);
	assert.strictEqual(subject.image, IMAGE2);
	assert.strictEqual(subject.width, IMAGE2.width);
	assert.strictEqual(subject.height, IMAGE2.height);
	assert.strictEqual(subject.sync(), false);
	assert.strictEqual(subject.image, IMAGE2);
	assert.strictEqual(subject.width, IMAGE2.width);
	assert.strictEqual(subject.height, IMAGE2.height);
	assert.strictEqual(subject.sync(), true);
	assert.strictEqual(subject.image, IMAGE1);
	assert.strictEqual(subject.width, IMAGE1.width);
	assert.strictEqual(subject.height, IMAGE1.height);
	assert.strictEqual(subject.sync(), false);
	assert.strictEqual(subject.image, IMAGE2);
	assert.strictEqual(subject.width, IMAGE2.width);
	assert.strictEqual(subject.height, IMAGE2.height);
	assert.strictEqual(subject.sync(), false);
	assert.strictEqual(subject.image, IMAGE2);
	assert.strictEqual(subject.width, IMAGE2.width);
	assert.strictEqual(subject.height, IMAGE2.height);
	assert.strictEqual(subject.sync(), true);
	assert.strictEqual(subject.image, IMAGE1);
	assert.strictEqual(subject.width, IMAGE1.width);
	assert.strictEqual(subject.height, IMAGE1.height);

	// factories
	subject = core2d.Animation.fromImages([IMAGE1, IMAGE2], 2);
	assert.strictEqual(subject.image, IMAGE1);
	assert.strictEqual(subject.width, IMAGE1.width);
	assert.strictEqual(subject.height, IMAGE1.height);
	assert.strictEqual(subject.sync(), false);
	assert.strictEqual(subject.image, IMAGE1);
	assert.strictEqual(subject.width, IMAGE1.width);
	assert.strictEqual(subject.height, IMAGE1.height);
	assert.strictEqual(subject.sync(), false);
	assert.strictEqual(subject.image, IMAGE2);
	assert.strictEqual(subject.width, IMAGE2.width);
	assert.strictEqual(subject.height, IMAGE2.height);
	assert.strictEqual(subject.sync(), false);
	assert.strictEqual(subject.image, IMAGE2);
	assert.strictEqual(subject.width, IMAGE2.width);
	assert.strictEqual(subject.height, IMAGE2.height);
	assert.strictEqual(subject.sync(), true);
	assert.strictEqual(subject.image, IMAGE1);
	assert.strictEqual(subject.width, IMAGE1.width);
	assert.strictEqual(subject.height, IMAGE1.height);
	assert.strictEqual(subject.sync(), false);
	assert.strictEqual(subject.image, IMAGE1);
	assert.strictEqual(subject.width, IMAGE1.width);
	assert.strictEqual(subject.height, IMAGE1.height);
	assert.strictEqual(subject.sync(), false);
	assert.strictEqual(subject.image, IMAGE2);
	assert.strictEqual(subject.width, IMAGE2.width);
	assert.strictEqual(subject.height, IMAGE2.height);
	assert.strictEqual(subject.sync(), false);
	assert.strictEqual(subject.image, IMAGE2);
	assert.strictEqual(subject.width, IMAGE2.width);
	assert.strictEqual(subject.height, IMAGE2.height);
	assert.strictEqual(subject.sync(), true);
	assert.strictEqual(subject.image, IMAGE1);
	assert.strictEqual(subject.width, IMAGE1.width);
	assert.strictEqual(subject.height, IMAGE1.height);
}

function controllerTest() {
	let controller;

	// mock
	const deviceMock = {
		commands: (() => {
			let result = {};

			for (let key in core2d.CommandEnum) {
				result[core2d.CommandEnum[key]] = true;
			}

			return result;
		})()
	};

	// no args constructor
	controller = core2d.Core2D.getController();

	for (let i in core2d.CommandEnum) {
		let value = core2d.CommandEnum[i];
		assert.strictEqual(controller.keyDown(value), undefined);
		assert.strictEqual(controller.keyPush(value), undefined);
	}

	// with all commands, first update
	controller.setDevice(deviceMock);
	assert.strictEqual(controller.update(), undefined);

	for (let j in core2d.CommandEnum) {
		assert.strictEqual(controller.keyDown(core2d.CommandEnum[j]), true);
		assert.strictEqual(controller.keyPush(core2d.CommandEnum[j]), true);
	}

	// with all commands, second update
	assert.strictEqual(controller.update(), undefined);

	for (let k in core2d.CommandEnum) {
		assert.strictEqual(controller.keyDown(core2d.CommandEnum[k]), true);
		assert.strictEqual(controller.keyPush(core2d.CommandEnum[k]), false);
	}
}

function frameTest() {
	const IMAGE = {
		width: 1,
		height: 2,
	};

	let subject;

	// constructor
	subject = new core2d.Frame(IMAGE, 1);
	assert.strictEqual(subject.image, IMAGE);
	assert.strictEqual(subject.duration, 1);
	assert.strictEqual(subject.width, IMAGE.width);
	assert.strictEqual(subject.height, IMAGE.height);
}

function initTest() {
	try {
		core2d.Core2D.init();
	} catch (e) {
		assert.strictEqual(e.message, "Could not get the next scene");
	}

	let scene = new core2d.Scene();
	core2d.Core2D.init(scene);
}

function pointTest() {
	let subject;

	// no args constructor
	subject = new core2d.Point();
	assert.strictEqual(subject.x, 0);
	assert.strictEqual(subject.y, 0);

	// all args constructor
	subject = new core2d.Point(1, 2);
	assert.strictEqual(subject.x, 1);
	assert.strictEqual(subject.y, 2);

	// setters
	assert.strictEqual(subject.setX(8), subject);
	assert.strictEqual(subject.x, 8);
	assert.strictEqual(subject.setY(9), subject);
	assert.strictEqual(subject.y, 9);
}

function pointerTest() {
	let pointer;

	// mock
	const deviceMock = {
		command: true,
		x: 100,
		y: 200,
	};

	// without device
	pointer = core2d.Core2D.getPointer();
	pointer.update();
	assert.strictEqual(pointer.x, 0);
	assert.strictEqual(pointer.y, 0);
	assert.strictEqual(pointer.down, false);

	// with device
	pointer.setDevice(deviceMock);
	pointer.update();
	assert.strictEqual(pointer.x, 80);
	assert.strictEqual(pointer.y, 133);
	assert.strictEqual(pointer.down, true);
}

function rectTest() {
	let subject;

	// no args constructor
	subject = new core2d.Rect();
	assert.strictEqual(subject.x, 0);
	assert.strictEqual(subject.y, 0);
	assert.strictEqual(subject.width, 0);
	assert.strictEqual(subject.height, 0);

	// all args constructor
	subject = new core2d.Rect(1, 2, 3, 4);
	assert.strictEqual(subject.x, 1);
	assert.strictEqual(subject.y, 2);
	assert.strictEqual(subject.width, 3);
	assert.strictEqual(subject.height, 4);

	// setters
	assert.strictEqual(subject.setWidth(7), subject);
	assert.strictEqual(subject.width, 7);

	assert.strictEqual(subject.setHeight(8), subject);
	assert.strictEqual(subject.height, 8);

	assert.strictEqual(subject.setHeight(9), subject);
	assert.strictEqual(subject.height, 9);

	assert.strictEqual(subject.setLeft(17), subject);
	assert.strictEqual(subject.left, 17);

	subject.left = 16;
	assert.strictEqual(subject.left, 16);

	assert.strictEqual(subject.setRight(18), subject);
	assert.strictEqual(subject.right, 18);

	subject.right = 17;
	assert.strictEqual(subject.right, 17);

	assert.strictEqual(subject.setTop(19), subject);
	assert.strictEqual(subject.top, 19);

	subject.top = 18;
	assert.strictEqual(subject.top, 18);

	assert.strictEqual(subject.setBottom(11), subject);
	assert.strictEqual(subject.bottom, 11);

	subject.bottom = 10;
	assert.strictEqual(subject.bottom, 10);

	assert.strictEqual(subject.setCenterX(14), subject);
	assert.strictEqual(subject.centerX, 14);

	subject.centerX = 13;
	assert.strictEqual(subject.centerX, 13);

	subject.setCenterY(15);
	assert.strictEqual(subject.centerY, 15);

	subject.centerY = 14;
	assert.strictEqual(subject.centerY, 14);

	assert.strictEqual(subject.setCenter(new core2d.Point().setX(12).setY(13)), subject);
	assert.strictEqual(subject.center.x, 12);
	assert.strictEqual(subject.center.y, 13);

	subject.center = new core2d.Point().setX(11).setY(12);
	assert.strictEqual(subject.center.x, 11);
	assert.strictEqual(subject.center.y, 12);

	// metrics
	subject = new core2d.Rect().setX(0).setY(0).setWidth(1).setHeight(1);
	assert.strictEqual(subject.right, 0);
	assert.strictEqual(subject.bottom, 0);

	subject = new core2d.Rect().setX(0).setY(0).setWidth(2).setHeight(2);
	assert.strictEqual(subject.right, 1);
	assert.strictEqual(subject.bottom, 1);

	subject = new core2d.Rect().setX(0).setY(0).setWidth(3).setHeight(3);
	assert.strictEqual(subject.right, 2);
	assert.strictEqual(subject.bottom, 2);

	subject = new core2d.Rect().setX(0).setY(0).setWidth(4).setHeight(4);
	assert.strictEqual(subject.right, 3);
	assert.strictEqual(subject.bottom, 3);

	subject.setRight(subject.right);
	subject.setBottom(subject.bottom);
	assert.strictEqual(subject.x, 0);
	assert.strictEqual(subject.y, 0);

	subject = new core2d.Rect().setX(0).setY(0).setWidth(5).setHeight(5);
	assert.strictEqual(subject.centerX, 2);
	assert.strictEqual(subject.centerY, 2);

	subject = new core2d.Rect().setX(0).setY(0).setWidth(6).setHeight(6);
	assert.strictEqual(subject.centerX, 3);
	assert.strictEqual(subject.centerY, 3);

	// union
	const RECT1 = new core2d.Rect().setX(10).setY(20).setWidth(30).setHeight(40);
	const RECT2 = new core2d.Rect().setX(50).setY(60).setWidth(70).setHeight(80);
	subject = RECT1.makeUnion(RECT2);
	assert.strictEqual(subject.left, RECT1.left);
	assert.strictEqual(subject.top, RECT1.top);
	assert.strictEqual(subject.right, RECT2.right);
	assert.strictEqual(subject.bottom, RECT2.bottom);
}

function sceneTest() {
	let subject = new core2d.Scene();

	// add sprites
	subject.add(new core2d.Sprite().addTag("test"));

	// get objects with tag
	assert.strictEqual(1, subject.getObjectsWithTag("test").length);
	assert.strictEqual(0, subject.getObjectsWithTag("blah").length);

	// build empty tiles
	subject.build([["a", "b", "c"], ["d", "e", "f"]], () => null, 0, 0, 0, 0);
}

function spriteTest() {
	let subject;
	let offBoundaryCalled;

	// no args constructor
	subject = new core2d.Sprite();
	assert.strictEqual(subject.accelerationX, 0);
	assert.strictEqual(subject.accelerationY, 0);
	assert.strictEqual(subject.boundary, null);
	assert.strictEqual(subject.color, null);
	assert.strictEqual(subject.essential, false);
	assert.strictEqual(subject.expiration, 0);
	assert.strictEqual(subject.expired, false);
	assert.strictEqual(subject.layerIndex, 0);
	assert.strictEqual(subject.maxSpeedX, 0);
	assert.strictEqual(subject.maxSpeedY, 0);
	assert.strictEqual(subject.solid, false);
	assert.strictEqual(subject.speedX, 0);
	assert.strictEqual(subject.speedY, 0);
	assert.strictEqual(subject.visible, true);
	assert.strictEqual(subject.angle, 0);
	assert.strictEqual(subject.direction.left, false);
	assert.strictEqual(subject.direction.right, false);
	assert.strictEqual(subject.direction.top, false);
	assert.strictEqual(subject.direction.bottom, false);
	assert.strictEqual(subject.image, null);
	assert.strictEqual(subject.tick, 0);

	// setters
	subject = new core2d.Sprite();
	assert.strictEqual(subject.setAccelerationX(4), subject);
	assert.strictEqual(subject.accelerationX, 4);
	assert.strictEqual(subject.setAccelerationY(5), subject);
	assert.strictEqual(subject.accelerationY, 5);
	assert.strictEqual(subject.setSpeedX(6), subject);
	assert.strictEqual(subject.speedX, 6);
	assert.strictEqual(subject.setSpeedY(7), subject);
	assert.strictEqual(subject.speedY, 7);
	assert.strictEqual(subject.setPosition(new core2d.Point().setX(8).setY(9)), subject);
	assert.strictEqual(subject.x, 8);
	assert.strictEqual(subject.y, 9);
	assert.strictEqual(subject.setX(10).setY(11), subject);
	assert.strictEqual(subject.x, 10);
	assert.strictEqual(subject.y, 11);
	assert.strictEqual(subject.setX(0).setY(0), subject);
	assert.strictEqual(subject.x, 0);
	assert.strictEqual(subject.y, 0);
	assert.strictEqual(subject.setSize(new core2d.Rect().setX(0).setY(0).setWidth(20).setHeight(21)), subject);
	assert.strictEqual(subject.width, 20);
	assert.strictEqual(subject.height, 21);
	assert.strictEqual(subject.setWidth(19).setHeight(19), subject);
	assert.strictEqual(subject.width, 19);
	assert.strictEqual(subject.height, 19);
	assert.strictEqual(subject.setWidth(0).setHeight(0), subject);
	assert.strictEqual(subject.width, 0);
	assert.strictEqual(subject.height, 0);

	// collision detection
	let subject1 = new core2d.Sprite().setWidth(2).setHeight(2);
	let subject2 = new core2d.Sprite().setX(1).setY(1).setWidth(2).setHeight(2);
	let subject3 = new core2d.Sprite().setX(2).setY(2).setWidth(2).setHeight(2);
	assert.strictEqual(subject1.hasCollision(subject2), true);
	assert.strictEqual(subject1.hasCollision(subject3), false);
	let collision = subject1.getCollision(subject2);
	assert.strictEqual(collision.right, true);
	assert.strictEqual(collision.bottom, true);

	// on boundary
	subject = new core2d.Sprite();
	subject.setWidth(16).setHeight(16);
	offBoundaryCalled = false;

	subject.offBoundary = () => {
		offBoundaryCalled = true;
	};

	subject.setBoundary(new core2d.Rect().setX(0).setY(0).setWidth(200).setHeight(200));
	subject.sync();
	assert.strictEqual(offBoundaryCalled, false);

	// off boundary
	subject.setBoundary(new core2d.Rect().setX(20).setHeight(20).setWidth(100).setHeight(100));
	subject.sync();
	assert.strictEqual(offBoundaryCalled, true);

	// expiration
	subject = new core2d.Sprite().setExpiration(5);

	for (let i = 0; i < 5; ++i) {
		assert.strictEqual(subject.expired, false);
		assert.strictEqual(subject.tick, i);
		assert.strictEqual(subject.sync(), false);
	}

	assert.strictEqual(subject.expired, true);
	assert.strictEqual(subject.sync(), true);

	// visibility
	subject.setVisible();
	assert.strictEqual(subject.visible, true);
	subject.setVisible(true);
	assert.strictEqual(subject.visible, true);
	subject.setVisible(false);
	assert.strictEqual(subject.visible, false);

	// speed to angle
	subject = new core2d.Sprite();
	subject.setSpeedToAngle(1, 0);
	assert.strictEqual(Math.round(subject.speedX), 1);
	assert.strictEqual(Math.round(subject.speedY), 0);
	subject.setSpeedToAngle(1, 90);
	assert.strictEqual(Math.round(subject.speedX), 0);
	assert.strictEqual(Math.round(subject.speedY), 1);
	subject.setSpeedToAngle(1, 180);
	assert.strictEqual(Math.round(subject.speedX), -1);
	assert.strictEqual(Math.round(subject.speedY), 0);
	subject.setSpeedToAngle(1, 270);
	assert.strictEqual(Math.round(subject.speedX), -0);
	assert.strictEqual(Math.round(subject.speedY), -1);

	// get angle
	subject = new core2d.Sprite();
	assert.strictEqual(subject.angle, 0);
	subject.setSpeedX(1);
	subject.setSpeedY(1);
	assert.strictEqual(subject.angle, 45);
	subject.setSpeedX(-1);
	subject.setSpeedY(1);
	assert.strictEqual(subject.angle, 135);
	subject.setSpeedX(-1);
	subject.setSpeedY(-1);
	assert.strictEqual(subject.angle, -135);
	subject.setSpeedX(1);
	subject.setSpeedY(-1);
	assert.strictEqual(subject.angle, -45);

	// speed to subject
	subject1 = new core2d.Sprite();
	subject2 = new core2d.Sprite().setX(100).setY(50);
	subject1.setSpeedToPoint(2, subject2);
	subject2.setSpeedToPoint(2, subject1);
	assert.strictEqual(subject1.speedX, 100 / 150 * 2);
	assert.strictEqual(subject1.speedY, 50 / 150 * 2);
	assert.strictEqual(subject2.speedX, -100 / 150 * 2);
	assert.strictEqual(subject2.speedY, -50 / 150 * 2);

	// max speed
	subject = new core2d.Sprite();
	subject.setMaxSpeedX(2);
	subject.setMaxSpeedY(4);
	subject.setAccelerationX(1);
	subject.setAccelerationY(2);
	subject.sync();
	assert.strictEqual(subject.speedX, 1);
	assert.strictEqual(subject.speedY, 2);
	subject.sync();
	assert.strictEqual(subject.speedX, 2);
	assert.strictEqual(subject.speedY, 4);
	subject.sync();
	assert.strictEqual(subject.speedX, 2);
	assert.strictEqual(subject.speedY, 4);
	subject.pause();
	subject.setAccelerationX(-1);
	subject.setAccelerationY(-2);
	subject.sync();
	assert.strictEqual(subject.speedX, -1);
	assert.strictEqual(subject.speedY, -2);
	subject.sync();
	assert.strictEqual(subject.speedX, -2);
	assert.strictEqual(subject.speedY, -4);
	subject.sync();
	assert.strictEqual(subject.speedX, -2);
	assert.strictEqual(subject.speedY, -4);

	// direction
	subject = new core2d.Sprite();
	assert.strictEqual(subject.direction.left, false);
	assert.strictEqual(subject.direction.right, false);
	assert.strictEqual(subject.direction.top, false);
	assert.strictEqual(subject.direction.bottom, false);
	subject.sync();
	assert.strictEqual(subject.direction.left, false);
	assert.strictEqual(subject.direction.right, false);
	assert.strictEqual(subject.direction.top, false);
	assert.strictEqual(subject.direction.bottom, false);
	subject.sync();
	subject.x += 1;
	assert.strictEqual(subject.direction.left, false);
	assert.strictEqual(subject.direction.right, true);
	assert.strictEqual(subject.direction.top, false);
	assert.strictEqual(subject.direction.bottom, false);
	subject.sync();
	subject.y += 1;
	assert.strictEqual(subject.direction.left, false);
	assert.strictEqual(subject.direction.right, false);
	assert.strictEqual(subject.direction.top, false);
	assert.strictEqual(subject.direction.bottom, true);
	subject.sync();
	subject.x -= 1;
	assert.strictEqual(subject.direction.left, true);
	assert.strictEqual(subject.direction.right, false);
	assert.strictEqual(subject.direction.top, false);
	assert.strictEqual(subject.direction.bottom, false);
	subject.sync();
	subject.y -= 1;
	assert.strictEqual(subject.direction.left, false);
	assert.strictEqual(subject.direction.right, false);
	assert.strictEqual(subject.direction.top, true);
	assert.strictEqual(subject.direction.bottom, false);
	subject.sync();
	assert.strictEqual(subject.direction.left, false);
	assert.strictEqual(subject.direction.right, false);
	assert.strictEqual(subject.direction.top, false);
	assert.strictEqual(subject.direction.bottom, false);

	// resume / stop
	subject
		.setSpeedX(1)
		.setSpeedY(2);

	subject.pause();
	subject.resume();

	assert.strictEqual(subject.speedX, 1);
	assert.strictEqual(subject.speedY, 2);

	subject.stop();
	subject.resume();

	assert.strictEqual(subject.speedX, 0);
	assert.strictEqual(subject.speedY, 0);
}

function textSpriteTest() {
	let text;

	// no args constructor
	new core2d.TextSprite();

	// all args constructor
	text = new core2d.TextSprite("whatever");

	// setFontColor
	text.setFontColor(core2d.Color.Black);
	assert.strictEqual(text.fontColor, core2d.Color.Black);

	// setFontFamily
	text.setFontFamily(core2d.FontFamily.Serif);
	assert.strictEqual(text.fontFamily, core2d.FontFamily.Serif);

	// setText
	text.setText("test");

	// getString
	assert.strictEqual(text.text, "test");
}

function core2dTest() {
	// load without saved data
	assert.strictEqual(core2d.Core2D.load(), undefined);

	// save then load data
	assert.strictEqual(core2d.Core2D.save({ level: 1 }), undefined);
	assert.strictEqual(JSON.stringify(core2d.Core2D.load()), JSON.stringify({ level: 1 }));

	// clear saved data
	assert.strictEqual(core2d.Core2D.save(), undefined);
	assert.strictEqual(core2d.Core2D.load(), undefined);

	// save then load data with namespace
	assert.strictEqual(core2d.Core2D.save({ lives: 1 }, "namespace"), undefined);
	assert.strictEqual(JSON.stringify({ lives: 1 }), JSON.stringify(core2d.Core2D.load("namespace")));
}

// plugin tests
function fontSpriteTest() {
	let text;

	// no args constructor
	new core2d.plugin.FontSprite();

	// all args constructor
	text = new core2d.plugin.FontSprite("whatever");

	// setText
	text.setText("test");

	// getString
	assert.strictEqual(text.text, "test");
}

// environment setup
function setup() {
	global.addEventListener = () => {};

	global.document = {
		getElementById: (id) => {
			if (id == "game") {
				return {
					focus: () => {},

					getContext: () => {
						return {
							fillRect: () => {},
						};
					},

					height: 400,
					offsetLeft: 0,
					offsetTop: 0,
					style: {},
					width: 640,
				};
			}

			return {};
		},
		getElementsByTagName: () => {
			return [];
		}
	};

	global.localStorage = {};
	global.navigator = {};

	global.window = {
		focus: () => {},
		innerHeight: 600,
		innerWidth: 800,
		requestAnimationFrame: () => true
	};
}
