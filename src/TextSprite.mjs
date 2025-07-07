"use strict";

import { ACL } from "./ACL.mjs";
import { Color } from "./Color.mjs";
import { FontFamily } from "./FontFamily.mjs";
import { Sprite } from "./Sprite.mjs";

const hiddenCanvas = ACL.document.createElement("canvas");
const hiddenContext = hiddenCanvas.getContext("2d");

/**
 * Represents a text sprite.
 * @extends Sprite
 */
export class TextSprite extends Sprite {
	/**
	 * Creates a new TextSprite.
	 * @param {string} [text=""] The text to display.
	 */
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

	/**
	 * Renders the text sprite.
	 * @param {CanvasRenderingContext2D} context The rendering context.
	 */
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

			context.fillText(
				this._text,
				this.left + this.scene.x,
				this.bottom + this.scene.y,
				this.width
			);

			if (this.shadowColor) {
				context.shadowColor = null;
				context.shadowOffsetX = 0;
				context.shadowOffsetY = 0;
				context.shadowBlur = 0;
			}

			if (this.strokeStyle) {
				context.lineWidth = this.lineWidth;
				context.strokeStyle = this.strokeStyle;
				context.strokeText(
					this._text,
					this.left + this.scene.x,
					this.bottom + this.scene.y,
					this.width
				);
				context.lineWidth = 0;
				context.strokeStyle = null;
			}
		}
	}

	/**
	 * Sets the font color.
	 * @param {string} fontColor The font color.
	 * @returns {TextSprite} This text sprite.
	 */
	setFontColor(fontColor) {
		this.fontColor = fontColor;
		return this;
	}

	/**
	 * Sets the font family.
	 * @param {string} fontFamily The font family.
	 * @returns {TextSprite} This text sprite.
	 */
	setFontFamily(fontFamily) {
		this._fontFamily = fontFamily;
		this._updateFont();
		return this;
	}

	/**
	 * Sets the font size.
	 * @param {number} fontSize The font size.
	 * @returns {TextSprite} This text sprite.
	 */
	setFontSize(fontSize) {
		this._fontSize = fontSize;
		this.height = fontSize;
		this._updateFont();
		return this;
	}

	/**
	 * Sets the line width.
	 * @param {number} lineWidth The line width.
	 * @returns {TextSprite} This text sprite.
	 */
	setLineWidth(lineWidth) {
		this.lineWidth = lineWidth;
		return this;
	}

	/**
	 * Sets the shadow blur.
	 * @param {number} shadowBlur The shadow blur.
	 * @returns {TextSprite} This text sprite.
	 */
	setShadowBlur(shadowBlur) {
		this.shadowBlur = shadowBlur;
		return this;
	}

	/**
	 * Sets the shadow color.
	 * @param {string} shadowColor The shadow color.
	 * @returns {TextSprite} This text sprite.
	 */
	setShadowColor(shadowColor) {
		this.shadowColor = shadowColor;
		return this;
	}

	/**
	 * Sets the shadow offset x.
	 * @param {number} shadowOffsetX The shadow offset x.
	 * @returns {TextSprite} This text sprite.
	 */
	setShadowOffsetX(shadowOffsetX) {
		this.shadowOffsetX = shadowOffsetX;
		return this;
	}

	/**
	 * Sets the shadow offset y.
	 * @param {number} shadowOffsetY The shadow offset y.
	 * @returns {TextSprite} This text sprite.
	 */
	setShadowOffsetY(shadowOffsetY) {
		this.shadowOffsetY = shadowOffsetY;
		return this;
	}

	/**
	 * Sets the stroke style.
	 * @param {string} strokeStyle The stroke style.
	 * @returns {TextSprite} This text sprite.
	 */
	setStrokeStyle(strokeStyle) {
		this.strokeStyle = strokeStyle;
		return this;
	}

	/**
	 * Sets the text.
	 * @param {string} text The text.
	 * @returns {TextSprite} This text sprite.
	 */
	setText(text) {
		this._text = text;
		this._updateFont();
		return this;
	}

	/**
	 * The font family.
	 * @type {string}
	 */
	get fontFamily() {
		return this._fontFamily;
	}

	/**
	 * The font size.
	 * @type {number}
	 */
	get fontSize() {
		return this._fontSize;
	}

	/**
	 * The text.
	 * @type {string}
	 */
	get text() {
		return this._text;
	}

	/**
	 * The font family.
	 * @type {string}
	 */
	set fontFamily(fontFamily) {
		this.setFontFamily(fontFamily);
	}

	/**
	 * The font size.
	 * @type {number}
	 */
	set fontSize(fontSize) {
		this.setFontSize(fontSize);
	}

	/**
	 * The text.
	 * @type {string}
	 */
	set text(text) {
		this.setText(text);
	}

	/**
	 * Updates the font.
	 * @private
	 */
	_updateFont() {
		this._font = `${this._fontSize}px ${this._fontFamily}`;
		hiddenContext.textBaseline = "top";
		hiddenContext.font = this._font;
		const measurement = hiddenContext.measureText(this._text);
		this.width = measurement.width;
	}
}
