"use strict";

import { ACL } from "./ACL.mjs";
import { Color } from "./Color.mjs";
import { FontFamily } from "./FontFamily.mjs";
import { Sprite } from "./Sprite.mjs";

const hiddenCanvas = ACL.document.createElement("canvas");
const hiddenContext = hiddenCanvas.getContext("2d");

export class TextSprite extends Sprite {
	constructor(text = "") {
		super();
		this.fontColor = Color.White;
		this.text = text;
		this._fontFamily = FontFamily.Monospace;
		this._fontSize = 16;
		this._updateFont();
	}

	render(context) {
		if (Sprite.prototype.render.call(this, context)) {
			context.fillStyle = this.fontColor;
			context.font = this._font;
			context.textBaseline = "top";
			context.fillText(this.text, this.left + this.scene.x, this.bottom + this.scene.y, this.width);
		}
	}

	setFontColor(fontColor) {
		this.fontColor = fontColor;
		return this;
	}

	setFontFamily(fontFamily) {
		this._fontFamily = fontFamily;
		this._updateFont();
		return this;
	}

	setFontSize(fontSize) {
		this._fontSize = fontSize;
		this._updateFont();
		return this;
	}

	setText(text) {
		this.text = text;
		return this;
	}

	get fontFamily() {
		return this._fontFamily;
	}

	get fontSize() {
		return this._fontSize;
	}

	set fontFamily(fontFamily) {
		this.setFontFamily(fontFamily);
	}

	set fontSize(fontSize) {
		this.setFontSize(fontSize);
	}

	_updateFont() {
		this._font = this._fontSize + "px " + this._fontFamily;
		hiddenContext.textBaseline = "top";
		hiddenContext.font = this._font;
		const measurement = hiddenContext.measureText(this.text);
		this.width = measurement.width;
	}
}
