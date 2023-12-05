import { Axis } from './Axis';
import { Command } from './Command';
import { ButtonLayout } from './ButtonLayout';
import { ButtonLayoutMap } from './ButtonLayoutMap';
import { Input } from './Input';
import { Static } from './Static';

export class GamePad {
	constructor(id = 0) {
		this._id = id;
		this.analogThreshold = 0.5;
		this.layout = ButtonLayout.standard;
		const MODEL = Static.getGamepads()[id].id.toLowerCase();

		for (let id in ButtonLayoutMap) {
			if (MODEL.includes(id)) {
				this.layout = ButtonLayout[ButtonLayoutMap[id]];
			}
		}
	}

	get commands() {
		const BUTTONS = Input.getGamePadButtons(this._id);
		const RESULT = {};

		if (Input.getGamePadAxes(this._id)[Axis.LEFT_Y] < - this.analogThreshold) {
			RESULT[Command.UP] = true;
		} else if (Input.getGamePadAxes(this._id)[Axis.LEFT_Y] > this.analogThreshold) {
			RESULT[Command.DOWN] = true;
		}

		if (Input.getGamePadAxes(this._id)[Axis.LEFT_X] < - this.analogThreshold) {
			RESULT[Command.LEFT] = true;
		} else if (Input.getGamePadAxes(this._id)[Axis.LEFT_X] > this.analogThreshold) {
			RESULT[Command.RIGHT] = true;
		}

		for (let i in Command) {
			const BUTTON = BUTTONS[this.layout[i]];

			if (BUTTON && BUTTON.pressed) {
				RESULT[Command[i]] = true;
			}
		}

		return RESULT;
	}
}
