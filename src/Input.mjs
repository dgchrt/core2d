"use strict";

import { Controller } from "./Controller.mjs";
import { GamePad } from "./GamePad.mjs";
import { Keyboard } from "./Keyboard.mjs";
import { Mouse } from "./Mouse.mjs";
import { Pointer } from "./Pointer.mjs";
import { Static } from "./Static.mjs";

export class Input {
	constructor() {
		this._controllers = [];
		this._controllerQueue = [];
		this._controllerRequestQueue = [];
		this._pointers = [];
		this._pointerQueue = [];
		this._pointerRequestQueue = [];
		this._gamePads = 0;

		const ON_KEYBOARD = (event) => {
			removeEventListener("keydown", ON_KEYBOARD);
			console.log("Keyboard detected.");
			this.addController(new Keyboard(event));
		};

		const ON_MOUSE = (event) => {
			removeEventListener("mousemove", ON_MOUSE);
			console.log("Mouse detected.");
			this.addPointer(new Mouse(event));
		};

		const ON_TOUCH = (event) => {
			removeEventListener("touchstart", ON_TOUCH);
			console.log("Touch detected.");
			this.addPointer(new Touch(event));
		};

		addEventListener("keydown", ON_KEYBOARD, false);
		addEventListener("mousemove", ON_MOUSE, false);
		addEventListener("touchstart", ON_TOUCH, false);
	}

	static getGamePadAxes(id) {
		if (Static.getGamepads()[id]) {
			return Static.getGamepads()[id].axes;
		}

		return [];
	}

	static getGamePadButtons(id) {
		const GAMEPAD = Static.getGamepads()[id];
		return GAMEPAD && GAMEPAD.buttons || [];
	}

	addController(device) {
		this._controllerQueue.push(device);
		this.checkControllerQueues();
	}

	addPointer(device) {
		this._pointerQueue.push(device);
		this.checkPointerQueues();
	}

	checkGamePads() {
		if (Static.getGamepads()[this._gamePads]) {
			console.log("Game pad detected.");
			this.addController(new GamePad(this._gamePads++));
		}
	}

	checkControllerQueues() {
		if (this._controllerRequestQueue.length > 0 && this._controllerQueue.length > 0) {
			const REQUESTER = this._controllerRequestQueue.shift();
			const DEVICE = this._controllerQueue.shift();
			REQUESTER.setDevice(DEVICE);
		}
	}

	checkPointerQueues() {
		if (this._pointerRequestQueue.length > 0 && this._pointerQueue.length > 0) {
			const REQUESTER = this._pointerRequestQueue.shift();
			const DEVICE = this._pointerQueue.shift();
			REQUESTER.setDevice(DEVICE);
		}
	}

	getController(id = 0) {
		if (this._controllers.length < id + 1) {
			const CONTROLLER = new Controller();
			this._controllers.push(CONTROLLER);
			this._controllerRequestQueue.push(CONTROLLER);
			this.checkControllerQueues();
		}

		return this._controllers[id];
	}

	getPointer(id = 0) {
		if (this._pointers.length < id + 1) {
			const POINTER = new Pointer();
			this._pointers.push(POINTER);
			this._pointerRequestQueue.push(POINTER);
			this.checkPointerQueues();
		}

		return this._pointers[id];
	}

	update() {
		this.checkGamePads();

		for (let i in this._controllers) {
			this._controllers[i].update();
		}

		for (let j in this._pointers) {
			this._pointers[j].update();
		}
	}
}
