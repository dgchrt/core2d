"use strict";

import { Command } from "./Command.mjs";

/**
 * Represents a controller, which can be a gamepad or a keyboard.
 */
export class Controller {
	/**
	 * Creates a new Controller.
	 */
	constructor() {
		/**
		 * The tolerance for the command sequence.
		 * @type {number}
		 */
		this.tolerance = 0;
		this._active = {};
		this._device = null;
		this._hold = {};
		this._sequence = [];
		this._tick = 0;
	}

	/**
	 * Checks if a sequence of commands was performed.
	 * @param {Command[]} commands The sequence of commands.
	 * @returns {boolean} Whether the sequence of commands was performed.
	 */
	didPerform(commands) {
		for (let i = 1; i <= commands.length; ++i) {
			if (
				this._sequence[this._sequence.length - i] !=
				commands[commands.length - i]
			) {
				return false;
			}
		}

		this._sequence = [];
		return true;
	}

	/**
	 * Checks if a command is being held down.
	 * @param {Command} command The command to check.
	 * @returns {boolean} Whether the command is being held down.
	 */
	keyDown(command) {
		return this._active[command];
	}

	/**
	 * Checks if a command was just pushed.
	 * @param {Command} command The command to check.
	 * @returns {boolean} Whether the command was just pushed.
	 */
	keyPush(command) {
		return this._active[command] && !this._hold[command];
	}

	/**
	 * Sets the device of the controller.
	 * @param {object} device The device.
	 */
	setDevice(device) {
		this._device = device;
	}

	/**
	 * Updates the controller.
	 */
	update() {
		if (!this._device) {
			return;
		}

		this._hold = {};
		const LAST = this._active;
		this._active = this._device.commands;

		for (let i in this._active) {
			if (LAST[i]) {
				this._hold[i] = true;
			}
		}

		if (this.tolerance && ++this._tick > this.tolerance) {
			this._sequence = [];
			this._tick = 0;
		}

		for (let i in Command) {
			const COMMAND = Command[i];

			if (this.keyPush(COMMAND)) {
				this._sequence.push(COMMAND);
				this._tick = 0;
			}
		}
	}
}
