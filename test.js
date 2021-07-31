"use strict";

setup();

// imports
const assert = require("assert");
const videogame = require("./videogame.js");
global.videogame = videogame;
videogame.plugin = require("./plugin.js");

// init
videogame.Videogame.init(new videogame.Scene());

// run videogame tests
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
videogameTest();

// run plugin tests
fontSpriteTest();

// videogame tests
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
		new videogame.Frame(IMAGE1, 1),
		new videogame.Frame(IMAGE2, 2),
	];

	// constructor
	subject = new videogame.Animation(FRAMES);
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
	subject = videogame.Animation.fromImages([IMAGE1, IMAGE2], 2);
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

			for (let key in videogame.CommandEnum) {
				result[videogame.CommandEnum[key]] = true;
			}

			return result;
		})()
	};

	// no args constructor
	controller = videogame.Videogame.getController();

	for (let i in videogame.CommandEnum) {
		let value = videogame.CommandEnum[i];
		assert.strictEqual(controller.keyDown(value), undefined);
		assert.strictEqual(controller.keyPush(value), undefined);
	}

	// with all commands, first update
	controller.setDevice(deviceMock);
	assert.strictEqual(controller.update(), undefined);

	for (let j in videogame.CommandEnum) {
		assert.strictEqual(controller.keyDown(videogame.CommandEnum[j]), true);
		assert.strictEqual(controller.keyPush(videogame.CommandEnum[j]), true);
	}

	// with all commands, second update
	assert.strictEqual(controller.update(), undefined);

	for (let k in videogame.CommandEnum) {
		assert.strictEqual(controller.keyDown(videogame.CommandEnum[k]), true);
		assert.strictEqual(controller.keyPush(videogame.CommandEnum[k]), false);
	}
}

function frameTest() {
	const IMAGE = {
		width: 1,
		height: 2,
	};

	let subject;

	// constructor
	subject = new videogame.Frame(IMAGE, 1);
	assert.strictEqual(subject.image, IMAGE);
	assert.strictEqual(subject.duration, 1);
	assert.strictEqual(subject.width, IMAGE.width);
	assert.strictEqual(subject.height, IMAGE.height);
}

function initTest() {
	try {
		videogame.Videogame.init();
	} catch (e) {
		assert.strictEqual(e.message, "Could not get the next scene");
	}

	let scene = new videogame.Scene();
	videogame.Videogame.init(scene);
}

function pointTest() {
	let subject;

	// no args constructor
	subject = new videogame.Point();
	assert.strictEqual(subject.x, 0);
	assert.strictEqual(subject.y, 0);

	// all args constructor
	subject = new videogame.Point(1, 2);
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
	pointer = videogame.Videogame.getPointer();
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
	subject = new videogame.Rect();
	assert.strictEqual(subject.x, 0);
	assert.strictEqual(subject.y, 0);
	assert.strictEqual(subject.width, 0);
	assert.strictEqual(subject.height, 0);

	// all args constructor
	subject = new videogame.Rect(1, 2, 3, 4);
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

	assert.strictEqual(subject.setCenter(new videogame.Point().setX(12).setY(13)), subject);
	assert.strictEqual(subject.center.x, 12);
	assert.strictEqual(subject.center.y, 13);

	subject.center = new videogame.Point().setX(11).setY(12);
	assert.strictEqual(subject.center.x, 11);
	assert.strictEqual(subject.center.y, 12);

	// metrics
	subject = new videogame.Rect().setX(0).setY(0).setWidth(1).setHeight(1);
	assert.strictEqual(subject.right, 0);
	assert.strictEqual(subject.bottom, 0);

	subject = new videogame.Rect().setX(0).setY(0).setWidth(2).setHeight(2);
	assert.strictEqual(subject.right, 1);
	assert.strictEqual(subject.bottom, 1);

	subject = new videogame.Rect().setX(0).setY(0).setWidth(3).setHeight(3);
	assert.strictEqual(subject.right, 2);
	assert.strictEqual(subject.bottom, 2);

	subject = new videogame.Rect().setX(0).setY(0).setWidth(4).setHeight(4);
	assert.strictEqual(subject.right, 3);
	assert.strictEqual(subject.bottom, 3);

	subject.setRight(subject.right);
	subject.setBottom(subject.bottom);
	assert.strictEqual(subject.x, 0);
	assert.strictEqual(subject.y, 0);

	subject = new videogame.Rect().setX(0).setY(0).setWidth(5).setHeight(5);
	assert.strictEqual(subject.centerX, 2);
	assert.strictEqual(subject.centerY, 2);

	subject = new videogame.Rect().setX(0).setY(0).setWidth(6).setHeight(6);
	assert.strictEqual(subject.centerX, 3);
	assert.strictEqual(subject.centerY, 3);

	// union
	const RECT1 = new videogame.Rect().setX(10).setY(20).setWidth(30).setHeight(40);
	const RECT2 = new videogame.Rect().setX(50).setY(60).setWidth(70).setHeight(80);
	subject = RECT1.makeUnion(RECT2);
	assert.strictEqual(subject.left, RECT1.left);
	assert.strictEqual(subject.top, RECT1.top);
	assert.strictEqual(subject.right, RECT2.right);
	assert.strictEqual(subject.bottom, RECT2.bottom);
}

function sceneTest() {
	let subject = new videogame.Scene();

	// add sprites
	subject.add(new videogame.Sprite().addTag("test"));

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
	subject = new videogame.Sprite();
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
	subject = new videogame.Sprite();
	assert.strictEqual(subject.setAccelerationX(4), subject);
	assert.strictEqual(subject.accelerationX, 4);
	assert.strictEqual(subject.setAccelerationY(5), subject);
	assert.strictEqual(subject.accelerationY, 5);
	assert.strictEqual(subject.setSpeedX(6), subject);
	assert.strictEqual(subject.speedX, 6);
	assert.strictEqual(subject.setSpeedY(7), subject);
	assert.strictEqual(subject.speedY, 7);
	assert.strictEqual(subject.setPosition(new videogame.Point().setX(8).setY(9)), subject);
	assert.strictEqual(subject.x, 8);
	assert.strictEqual(subject.y, 9);
	assert.strictEqual(subject.setX(10).setY(11), subject);
	assert.strictEqual(subject.x, 10);
	assert.strictEqual(subject.y, 11);
	assert.strictEqual(subject.setX(0).setY(0), subject);
	assert.strictEqual(subject.x, 0);
	assert.strictEqual(subject.y, 0);
	assert.strictEqual(subject.setSize(new videogame.Rect().setX(0).setY(0).setWidth(20).setHeight(21)), subject);
	assert.strictEqual(subject.width, 20);
	assert.strictEqual(subject.height, 21);
	assert.strictEqual(subject.setWidth(19).setHeight(19), subject);
	assert.strictEqual(subject.width, 19);
	assert.strictEqual(subject.height, 19);
	assert.strictEqual(subject.setWidth(0).setHeight(0), subject);
	assert.strictEqual(subject.width, 0);
	assert.strictEqual(subject.height, 0);

	// collision detection
	let subject1 = new videogame.Sprite().setWidth(2).setHeight(2);
	let subject2 = new videogame.Sprite().setX(1).setY(1).setWidth(2).setHeight(2);
	let subject3 = new videogame.Sprite().setX(2).setY(2).setWidth(2).setHeight(2);
	assert.strictEqual(subject1.hasCollision(subject2), true);
	assert.strictEqual(subject1.hasCollision(subject3), false);
	let collision = subject1.getCollision(subject2);
	assert.strictEqual(collision.right, true);
	assert.strictEqual(collision.bottom, true);

	// on boundary
	subject = new videogame.Sprite();
	subject.setWidth(16).setHeight(16);
	offBoundaryCalled = false;

	subject.offBoundary = () => {
		offBoundaryCalled = true;
	};

	subject.setBoundary(new videogame.Rect().setX(0).setY(0).setWidth(200).setHeight(200));
	subject.sync();
	assert.strictEqual(offBoundaryCalled, false);

	// off boundary
	subject.setBoundary(new videogame.Rect().setX(20).setHeight(20).setWidth(100).setHeight(100));
	subject.sync();
	assert.strictEqual(offBoundaryCalled, true);

	// expiration
	subject = new videogame.Sprite().setExpiration(5);

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
	subject = new videogame.Sprite();
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
	subject = new videogame.Sprite();
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
	subject1 = new videogame.Sprite();
	subject2 = new videogame.Sprite().setX(100).setY(50);
	subject1.setSpeedToPoint(2, subject2);
	subject2.setSpeedToPoint(2, subject1);
	assert.strictEqual(subject1.speedX, 100 / 150 * 2);
	assert.strictEqual(subject1.speedY, 50 / 150 * 2);
	assert.strictEqual(subject2.speedX, -100 / 150 * 2);
	assert.strictEqual(subject2.speedY, -50 / 150 * 2);

	// max speed
	subject = new videogame.Sprite();
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
	subject = new videogame.Sprite();
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
		.setSpeedY(2)
		.setZoomSpeed(3);

	subject.pause();
	subject.resume();

	assert.strictEqual(subject.speedX, 1);
	assert.strictEqual(subject.speedY, 2);
	assert.strictEqual(subject.zoomSpeed, 3);

	subject.stop();
	subject.resume();

	assert.strictEqual(subject.speedX, 0);
	assert.strictEqual(subject.speedY, 0);
	assert.strictEqual(subject.zoomSpeed, 0);
}

function textSpriteTest() {
	let text;

	// no args constructor
	new videogame.TextSprite();

	// all args constructor
	text = new videogame.TextSprite("whatever");

	// setFontColor
	text.setFontColor(videogame.Color.Black);
	assert.strictEqual(text.fontColor, videogame.Color.Black);

	// setFontFamily
	text.setFontFamily(videogame.FontFamily.Serif);
	assert.strictEqual(text.fontFamily, videogame.FontFamily.Serif);

	// setText
	text.setText("test");

	// getString
	assert.strictEqual(text.text, "test");
}

function videogameTest() {
	// load without saved data
	assert.strictEqual(videogame.Videogame.load(), undefined);

	// save then load data
	assert.strictEqual(videogame.Videogame.save({ level: 1 }), undefined);
	assert.strictEqual(JSON.stringify(videogame.Videogame.load()), JSON.stringify({ level: 1 }));

	// clear saved data
	assert.strictEqual(videogame.Videogame.save(), undefined);
	assert.strictEqual(videogame.Videogame.load(), undefined);

	// save then load data with namespace
	assert.strictEqual(videogame.Videogame.save({ lives: 1 }, "namespace"), undefined);
	assert.strictEqual(JSON.stringify({ lives: 1 }), JSON.stringify(videogame.Videogame.load("namespace")));
}

// plugin tests
function fontSpriteTest() {
	let text;

	// no args constructor
	new videogame.plugin.FontSprite();

	// all args constructor
	text = new videogame.plugin.FontSprite("whatever");

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
						return {};
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
