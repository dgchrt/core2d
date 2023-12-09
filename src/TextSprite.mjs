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
		this._text = text;
		this._fontFamily = FontFamily.Monospace;
		this._fontSize = 16;
		this.fontColor = Color.White;
		this.lineWidth = 0;
		this.shadowBlur = 0;
		this.shadowColor = null;
		this.shadowOffsetX = 0;
		this.shadowOffsetY = 0;
		this.strokeStyle = null;
		this._updateFont();
	}

	render(context) {
		if (Sprite.prototype.render.call(this, context)) {
			context.fillStyle = this.fontColor;
			context.font = this._font;
			context.textBaseline = "top";

			if (this.shadowColor) {
				context.shadowColor = this.shadowColor;
				context.shadowOffsetX = this.shadowOffsetX;
				context.shadowOffsetY = this.shadowOffsetY;
				context.shadowBlur = this.shadowBlur;
			}

			context.fillText(this._text, this.left + this.scene.x, this.bottom + this.scene.y, this.width);

			if (this.shadowColor) {
				context.shadowColor = null;
				context.shadowOffsetX = 0;
				context.shadowOffsetY = 0;
				context.shadowBlur = 0;
			}

			if (this.strokeStyle) {
				context.lineWidth = this.lineWidth;
				context.strokeStyle = this.strokeStyle;
				context.strokeText(this._text, this.left + this.scene.x, this.bottom + this.scene.y, this.width);
				context.lineWidth = 0;
				context.strokeStyle = null;
			}
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
		this.height = fontSize;
		this._updateFont();
		return this;
	}

	setLineWidth(lineWidth) {
		this.lineWidth = lineWidth;
		return this;
	}

	setShadowBlur(shadowBlur) {
		this.shadowBlur = shadowBlur;
		return this;
	}

	setShadowColor(shadowColor) {
		this.shadowColor = shadowColor;
		return this;
	}

	setShadowOffsetX(shadowOffsetX) {
		this.shadowOffsetX = shadowOffsetX;
		return this;
	}

	setShadowOffsetY(shadowOffsetY) {
		this.shadowOffsetY = shadowOffsetY;
		return this;
	}

	setStrokeStyle(strokeStyle) {
		this.strokeStyle = strokeStyle;
		return this;
	}

	setText(text) {
		this._text = text;
		this._updateFont();
		return this;
	}

	get fontFamily() {
		return this._fontFamily;
	}

	get fontSize() {
		return this._fontSize;
	}

	get text() {
		return this._text;
	}

	set fontFamily(fontFamily) {
		this.setFontFamily(fontFamily);
	}

	set fontSize(fontSize) {
		this.setFontSize(fontSize);
	}

	set text(text) {
		this.setText(text);
	}

	_updateFont() {
		this._font = `${this._fontSize}px ${this._fontFamily}`;
		hiddenContext.textBaseline = "top";
		hiddenContext.font = this._font;
		const measurement = hiddenContext.measureText(this._text);
		this.width = measurement.width;
	}
}
