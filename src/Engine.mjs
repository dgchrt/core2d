"use strict";

import { ACL } from "./ACL.mjs";
import { Color } from "./Color.mjs";
import { CompositeOperations } from "./CompositeOperations.mjs";
import { Frame } from "./Frame.mjs";
import { Input } from "./Input.mjs";
import { Point } from "./Point.mjs";
import { Rect } from "./Rect.mjs";
import { RenderableList } from "./RenderableList.mjs";
import { Scene } from "./Scene.mjs";
import { Sound } from "./Sound.mjs";
import { Sprite } from "./Sprite.mjs";
import { Static } from "./Static.mjs";

const CANVAS_ELEMENT = "canvas";
const CONTEXT = "2d";
const DEFAULT_FRAME_TIME = 16;

export const Engine = (() => {
	let _autoScale = true;
	let _canvas = Static.getElement("app") || Static.getElements(CANVAS_ELEMENT)[0];
	let _context = _canvas.getContext(CONTEXT);
	let _everyOther = true;
	let _frameTime = DEFAULT_FRAME_TIME;
	let _fullScreen = false;
	let _height = _canvas.height;
	let _imageCache = {};
	let _keepAspect = false;
	let _input = new Input();
	let _lastRender;
	let _name = "Game";
	let _realHeight = _canvas.height;
	let _realWidth = _canvas.width;
	let _renderableLists = [];
	let _scene;
	let _sound = new Sound();
	let _transition;
	let _width = _canvas.width;

	class Engine {
		static init(scene) {
			_scene = scene;
			boot(_canvas, _context);
		}

		static get bottom() {
			return _height - 1;
		}

		static get center() {
			return new Point(this.centerX, this.centerY);
		}

		static get centerX() {
			return Math.floor(_width / 2);
		}

		static get centerY() {
			return Math.floor(_height / 2);
		}

		static get height() {
			return _height;
		}

		static getName() {
			return _name;
		}

		static get offsetLeft() {
			return _canvas.offsetLeft;
		}

		static get offsetTop() {
			return _canvas.offsetTop;
		}

		static get right() {
			return _width - 1;
		}

		static get everyOther() {
			return _everyOther;
		}

		static get frameTime() {
			return _frameTime;
		}

		static get realHeight() {
			return _realHeight;
		}

		static get realWidth() {
			return _realWidth;
		}

		static get width() {
			return _width;
		}

		static addControllerDevice(device) {
			_input.addController(device);
		}

		static clear() {
			_context.clearRect(0, 0, _width, _height);
		}

		static colorize(image, fillStyle, compositeOperation = CompositeOperations.SOURCE_IN) {
			const input = Static.getImage(image);
			const output = ACL.document.createElement(CANVAS_ELEMENT);
			output.width = input.width;
			output.height = input.height;
			const context = output.getContext(CONTEXT);
			context.drawImage(input, 0, 0);
			context.globalCompositeOperation = compositeOperation;
			context.fillStyle = fillStyle;
			context.fillRect(0, 0, output.width, output.height);
			return output;
		}

		static fadeOut() {
			_sound.fadeOut();
		}

		static flip(image) {
			return invert(image, false, true);
		}

		static getController(id) {
			return _input.getController(id);
		}

		static get controller() {
			return this.getController();
		}

		static getPointer(id) {
			return _input.getPointer(id);
		}

		static get pointer() {
			return this.getPointer();
		}

		static load(namespace) {
			const container = localStorage[namespace ?? Engine.getName()];
			let result;

			try {
				result = container && JSON.parse(container);
			} catch (error) {
				console.log("Could not load saved game: " + error);
			}

			return result;
		}

		static mirror(image) {
			return invert(image, true, false);
		}

		static mute() {
			_sound.mute();
		}

		static paint(renderable, index = 0) {
			if (index >= _renderableLists.length) {
				for (let i = _renderableLists.length; i <= index; ++i) {
					_renderableLists.push(new RenderableList());
				}
			}

			_renderableLists[index].add(renderable);
		}

		static play(id, volume) {
			_sound.play(id, volume);
		}

		static playTheme(name) {
			_sound.playTheme(name);
		}

		static random(max) {
			return Math.floor(Math.random() * (max + 1));
		}

		static rotate(image, degrees) {
			const input = Static.getImage(image);
			degrees = degrees % 360;

			if (degrees == 0 ) {
				return input;
			}

			const output = ACL.document.createElement(CANVAS_ELEMENT);
			output.width = input.width;
			output.height = input.height;
			const context = output.getContext(CONTEXT);
			context.translate(output.width / 2, output.height / 2);
			context.rotate(Static.toRadians(degrees));
			context.drawImage(input, -input.width / 2, -input.height / 2);
			return output;
		}

		static save(data, namespace) {
			try {
				localStorage[namespace || Engine.getName()] = data && JSON.stringify(data);
			} catch (error) {
				console.log("Could not save current game: " + error);
			}
		}

		static setAutoScale(customAutoScale = true) {
			_autoScale = customAutoScale;
		}

		static setFrameTime(frameTime) {
			_frameTime = frameTime ?? DEFAULT_FRAME_TIME;
		}

		static setFullScreen(customFullScreen = true) {
			_fullScreen = customFullScreen;
		}

		static setKeepAspect(customKeepAspect = true) {
			_keepAspect = customKeepAspect;
		}

		static setName(name) {
			_name = name;
			document && (ACL.document.title = _name);
		}

		static stopTheme() {
			_sound.stopTheme();
		}

		// factories
		static animation(frames) {
			return new Animation(frames);
		}

		static frame(image, duration) {
			return new Frame(image, duration);
		}

		static image(id, isMirror, isFlip) {
			if (isFlip && isMirror) {
				if (_imageCache[id] && _imageCache[id].flipMirror) {
					return _imageCache[id].flipMirror;
				}

				_imageCache[id] = _imageCache[id] || {};
				_imageCache[id].flipMirror = invert(Static.getElement(id), true, true);
				return _imageCache[id].flip;
			}

			if (isFlip) {
				if (_imageCache[id] && _imageCache[id].flip) {
					return _imageCache[id].flip;
				}

				_imageCache[id] = _imageCache[id] || {};
				_imageCache[id].flip = Engine.flip(Static.getElement(id));
				return _imageCache[id].flip;
			}

			if (isMirror) {
				if (_imageCache[id] && _imageCache[id].mirror) {
					return _imageCache[id].mirror;
				}

				_imageCache[id] = _imageCache[id] || {};
				_imageCache[id].mirror = Engine.mirror(Static.getElement(id));
				return _imageCache[id].mirror;
			}

			return Static.getElement(id);
		}

		static point(x, y) {
			return new Point(x, y);
		}

		static rect(x, y, width, height) {
			return new Rect(x, y, width, height);
		}

		static scene() {
			return new Scene();
		}

		static sprite(scene) {
			return new Sprite(scene);
		}
	}

	function boot(canvas, context) {
		_canvas.style.transform = "translateZ(0)";
		addEventListener("blur", focus, false);
		addEventListener("click", focus, false);
		addEventListener("focus", focus, false);
		addEventListener("load", focus, false);
		addEventListener("resize", scale, false);
		// focus(); // TODO: test all platforms before finally removing it
		scale();
		const images = Static.getElements("img");
		const total = images.length;
		let complete = 0;

		for (let i = 0; i < images.length; ++i) {
			const IMAGE = images[i];

			if (IMAGE.complete) {
				++complete;
			}
		}

		context.fillStyle = Color.Blue;
		context.fillRect(0, 0, canvas.width * complete / total, canvas.height);

		if (complete < total) {
			setTimeout(() => {
				boot(canvas, context);
			}, 100);

			return;
		}

		initScene();
		_lastRender = Date.now();
		loop();
	}

	function focus() {
		ACL.window.focus();

		if (_fullScreen && _canvas.requestFullscreen) {
			_canvas.requestFullscreen().catch((error) => {
				console.warn("Could not request full screen", error);
			});
		}
	}

	function initScene() {
		if (!_scene) {
			throw new Error("Could not get the next scene");
		}

		_scene.scene = new Point();
		_scene.height = _scene.height || _height;
		_scene.width = _scene.width || _width;
		_scene.init();
	}

	function invert(image, isMirror, isFlip) {
		const input = Static.getImage(image);
		const output = ACL.document.createElement(CANVAS_ELEMENT);
		output.width = input.width;
		output.height = input.height;
		const context = output.getContext(CONTEXT);
		context.translate(isMirror ? output.width : 0, isFlip ? output.height : 0);
		context.scale(isMirror ? -1 : 1, isFlip ? - 1 : 1);
		context.drawImage(input, 0, 0);
		return output;
	}

	function loop() {
		_everyOther = !_everyOther;
		_input.update();

		if (_transition != null) {
			if (_transition.sync()) {
				_transition = null;
				initScene();
			} else {
				Engine.paint(_transition);
			}
		} else {
			if (_scene.sync()) {
				_transition = _scene.transition;

				if (_transition) {
					_transition.scene = _scene;
					_transition.init();
				}

				_scene = _scene.next;

				if (!_transition) {
					initScene();
				}
			} else {
				_scene.update();
			}
		}

		_sound.update();
		ACL.window.requestAnimationFrame(render);
	}

	function render() {
		for (let i = 0; i < _renderableLists.length; ++i) {
			_renderableLists[i].render(_context);
		}

		setTimeout(loop, _frameTime + _lastRender - Date.now());
		_lastRender = Date.now();
	}

	function scale() {
		if (!_autoScale) {
			return;
		}

		let width, height;

		if (_keepAspect) {
			let proportion = ACL.window.innerWidth / _canvas.width;

			if (ACL.window.innerHeight < _canvas.height * proportion) {
				proportion = ACL.window.innerHeight / _canvas.height;
			}

			width = _canvas.width * proportion;
			height = _canvas.height * proportion;
		} else {
			width = ACL.window.innerWidth;
			height = ACL.window.innerHeight;
		}

		_realWidth = width;
		_realHeight = height;
		_canvas.style.width = width + "px";
		_canvas.style.height = height + "px";
	}

	return Engine;
})();
