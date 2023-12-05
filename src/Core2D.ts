import { Engine } from './Engine';
import { Frame } from './Frame';
import { Point } from './Point';
import { Rect } from './Rect';
import { Scene } from './Scene';
import { Sprite } from './Sprite';

export class Core2D {
	static init(scene) {
		Engine.init(scene);
	}

	static get everyOther() {
		return Engine.everyOther;
	}

	static addControllerDevice(device) {
		Engine.addControllerDevice(device);
	}

	static clear() {
		Engine.clear();
	}

	static colorize(image, fillStyle) {
		return Engine.colorize(image, fillStyle);
	}

	static fadeOut() {
		Engine.fadeOut();
	}

	static flip(id) {
		return Engine.flip(id);
	}

	static getController(id) {
		return Engine.getController(id);
	}

	static getPointer(id) {
		return Engine.getPointer(id);
	}

	static image(id, isMirror, isFlip) {
		return Engine.image(id, isMirror, isFlip);
	}

	static load(namespace) {
		return Engine.load(namespace);
	}

	static mirror(id) {
		return Engine.mirror(id);
	}

	static mute() {
		Engine.mute();
	}

	static paint(renderable, index) {
		Engine.paint(renderable, index);
	}

	static play(id) {
		Engine.play(id);
	}

	static playTheme(name) {
		Engine.playTheme(name);
	}

	static random(max) {
		return Engine.random(max);
	}

	static rotate(image, degrees) {
		return Engine.rotate(image, degrees);
	}

	static save(data, namespace) {
		Engine.save(data, namespace);
	}

	static setAutoScale(autoScale) {
		Engine.setAutoScale(autoScale);
	}

	static setFrameTime(frameTime) {
		Engine.setFrameTime(frameTime);
	}

	static setKeepAspect(keepAspect) {
		Engine.setKeepAspect(keepAspect);
	}

	static setName(name) {
		Engine.setName(name);
	}

	static stopTheme() {
		Engine.stopTheme();
	}

	// factories
	static animation(frames) {
		return new Animation(frames);
	}

	static frame(image, duration) {
		return new Frame(image, duration);
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
