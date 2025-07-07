"use strict";

import { Animation } from "./Animation.mjs";
import { Engine } from "./Engine.mjs";
import { Frame } from "./Frame.mjs";
import { Point } from "./Point.mjs";
import { Rect } from "./Rect.mjs";
import { Scene } from "./Scene.mjs";
import { Sprite } from "./Sprite.mjs";

/**
 * The main class of the Core2D library.
 */
export class Core2D {
	/**
	 * Initializes the engine.
	 * @param {Scene} scene The initial scene.
	 */
	static init(scene) {
		Engine.init(scene);
	}

	/**
	 * Whether the current frame is an even frame.
	 * @type {boolean}
	 */
	static get everyOther() {
		return Engine.everyOther;
	}

	/**
	 * Adds a controller device.
	 * @param {object} device The controller device.
	 */
	static addControllerDevice(device) {
		Engine.addControllerDevice(device);
	}

	/**
	 * Clears the canvas.
	 */
	static clear() {
		Engine.clear();
	}

	/**
	 * Colorizes an image.
	 * @param {HTMLImageElement|HTMLCanvasElement} image The image to colorize.
	 * @param {string} fillStyle The color to use.
	 * @returns {HTMLCanvasElement} The colorized image.
	 */
	static colorize(image, fillStyle) {
		return Engine.colorize(image, fillStyle);
	}

	/**
	 * Fades out the current theme.
	 */
	static fadeOut() {
		Engine.fadeOut();
	}

	/**
	 * Flips an image vertically.
	 * @param {string} id The ID of the image to flip.
	 * @returns {HTMLCanvasElement} The flipped image.
	 */
	static flip(id) {
		return Engine.flip(id);
	}

	/**
	 * Gets a controller.
	 * @param {number} id The ID of the controller.
	 * @returns {Controller} The controller.
	 */
	static getController(id) {
		return Engine.getController(id);
	}

	/**
	 * Gets a pointer.
	 * @param {number} id The ID of the pointer.
	 * @returns {Pointer} The pointer.
	 */
	static getPointer(id) {
		return Engine.getPointer(id);
	}

	/**
	 * Gets an image.
	 * @param {string} id The ID of the image.
	 * @param {boolean} isMirror Whether to mirror the image.
	 * @param {boolean} isFlip Whether to flip the image.
	 * @returns {HTMLImageElement|HTMLCanvasElement} The image.
	 */
	static image(id, isMirror, isFlip) {
		return Engine.image(id, isMirror, isFlip);
	}

	/**
	 * Loads data from local storage.
	 * @param {string} namespace The namespace to use.
	 * @returns {object} The loaded data.
	 */
	static load(namespace) {
		return Engine.load(namespace);
	}

	/**
	 * Mirrors an image horizontally.
	 * @param {string} id The ID of the image to mirror.
	 * @returns {HTMLCanvasElement} The mirrored image.
	 */
	static mirror(id) {
		return Engine.mirror(id);
	}

	/**
	 * Mutes or unmutes the sound.
	 */
	static mute() {
		Engine.mute();
	}

	/**
	 * Paints a renderable object.
	 * @param {object} renderable The renderable object.
	 * @param {number} index The layer index.
	 */
	static paint(renderable, index) {
		Engine.paint(renderable, index);
	}

	/**
	 * Plays a sound.
	 * @param {string} id The ID of the sound to play.
	 * @param {number} volume The volume to play the sound at.
	 */
	static play(id, volume) {
		Engine.play(id, volume);
	}

	/**
	 * Plays a theme.
	 * @param {string} name The name of the theme to play.
	 */
	static playTheme(name) {
		Engine.playTheme(name);
	}

	/**
	 * Generates a random number.
	 * @param {number} max The maximum value.
	 * @returns {number} The random number.
	 */
	static random(max) {
		return Engine.random(max);
	}

	/**
	 * Rotates an image.
	 * @param {HTMLImageElement|HTMLCanvasElement} image The image to rotate.
	 * @param {number} degrees The number of degrees to rotate the image.
	 * @returns {HTMLCanvasElement} The rotated image.
	 */
	static rotate(image, degrees) {
		return Engine.rotate(image, degrees);
	}

	/**
	 * Saves data to local storage.
	 * @param {object} data The data to save.
	 * @param {string} namespace The namespace to use.
	 */
	static save(data, namespace) {
		Engine.save(data, namespace);
	}

	/**
	 * Sets whether to automatically scale the canvas.
	 * @param {boolean} autoScale Whether to automatically scale the canvas.
	 */
	static setAutoScale(autoScale) {
		Engine.setAutoScale(autoScale);
	}

	/**
	 * Sets the frame time.
	 * @param {number} frameTime The frame time in milliseconds.
	 */
	static setFrameTime(frameTime) {
		Engine.setFrameTime(frameTime);
	}

	/**
	 * Sets whether to use full screen.
	 * @param {boolean} fullScreen Whether to use full screen.
	 */
	static setFullScreen(fullScreen) {
		Engine.setFullScreen(fullScreen);
	}

	/**
	 * Sets whether to keep the aspect ratio when scaling the canvas.
	 * @param {boolean} keepAspect Whether to keep the aspect ratio.
	 */
	static setKeepAspect(keepAspect) {
		Engine.setKeepAspect(keepAspect);
	}

	/**
	 * Sets the name of the game.
	 * @param {string} name The name of the game.
	 */
	static setName(name) {
		Engine.setName(name);
	}

	/**
	 * Stops the current theme.
	 */
	static stopTheme() {
		Engine.stopTheme();
	}

	/**
	 * Creates a new Animation.
	 * @param {Frame[]} frames The frames of the animation.
	 * @returns {Animation} The new animation.
	 */
	static animation(frames) {
		return new Animation(frames);
	}

	/**
	 * Creates a new Frame.
	 * @param {HTMLImageElement|HTMLCanvasElement} image The image of the frame.
	 * @param {number} duration The duration of the frame in ticks.
	 * @returns {Frame} The new frame.
	 */
	static frame(image, duration) {
		return new Frame(image, duration);
	}

	/**
	 * Creates a new Point.
	 * @param {number} x The x-coordinate of the point.
	 * @param {number} y The y-coordinate of the point.
	 * @returns {Point} The new point.
	 */
	static point(x, y) {
		return new Point(x, y);
	}

	/**
	 * Creates a new Rect.
	 * @param {number} x The x-coordinate of the rectangle.
	 * @param {number} y The y-coordinate of the rectangle.
	 * @param {number} width The width of the rectangle.
	 * @param {number} height The height of the rectangle.
	 * @returns {Rect} The new rectangle.
	 */
	static rect(x, y, width, height) {
		return new Rect(x, y, width, height);
	}

	/**
	 * Creates a new Scene.
	 * @returns {Scene} The new scene.
	 */
	static scene() {
		return new Scene();
	}

	/**
	 * Creates a new Sprite.
	 * @param {Scene} scene The scene of the sprite.
	 * @returns {Sprite} The new sprite.
	 */
	static sprite(scene) {
		return new Sprite(scene);
	}
}
