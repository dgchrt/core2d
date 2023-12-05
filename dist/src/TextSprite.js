"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextSprite = void 0;
const Color_ts_1 = require("./Color.ts");
const FontFamily_ts_1 = require("./FontFamily.ts");
const Sprite_ts_1 = require("./Sprite.ts");
class TextSprite extends Sprite_ts_1.Sprite {
    constructor(text) {
        super();
        this.fontColor = Color_ts_1.Color.White;
        this.text = text;
        this._fontFamily = FontFamily_ts_1.FontFamily.Monospace;
        this._fontSize = 16;
        this._updateFont();
    }
    render(context) {
        if (Sprite_ts_1.Sprite.prototype.render.call(this, context)) {
            context.fillStyle = this.fontColor;
            context.font = this._font;
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
    }
}
exports.TextSprite = TextSprite;
