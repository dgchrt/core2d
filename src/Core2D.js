"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Core2D = void 0;
const Engine_ts_1 = require("./Engine.ts");
const Frame_ts_1 = require("./Frame.ts");
const Point_ts_1 = require("./Point.ts");
const Rect_ts_1 = require("./Rect.ts");
const Scene_ts_1 = require("./Scene.ts");
const Sprite_ts_1 = require("./Sprite.ts");
class Core2D {
    static init(scene) {
        Engine_ts_1.Engine.init(scene);
    }
    static get everyOther() {
        return Engine_ts_1.Engine.everyOther;
    }
    static addControllerDevice(device) {
        Engine_ts_1.Engine.addControllerDevice(device);
    }
    static clear() {
        Engine_ts_1.Engine.clear();
    }
    static colorize(image, fillStyle) {
        return Engine_ts_1.Engine.colorize(image, fillStyle);
    }
    static fadeOut() {
        Engine_ts_1.Engine.fadeOut();
    }
    static flip(id) {
        return Engine_ts_1.Engine.flip(id);
    }
    static getController(id) {
        return Engine_ts_1.Engine.getController(id);
    }
    static getPointer(id) {
        return Engine_ts_1.Engine.getPointer(id);
    }
    static image(id, isMirror, isFlip) {
        return Engine_ts_1.Engine.image(id, isMirror, isFlip);
    }
    static load(namespace) {
        return Engine_ts_1.Engine.load(namespace);
    }
    static mirror(id) {
        return Engine_ts_1.Engine.mirror(id);
    }
    static mute() {
        Engine_ts_1.Engine.mute();
    }
    static paint(renderable, index) {
        Engine_ts_1.Engine.paint(renderable, index);
    }
    static play(id) {
        Engine_ts_1.Engine.play(id);
    }
    static playTheme(name) {
        Engine_ts_1.Engine.playTheme(name);
    }
    static random(max) {
        return Engine_ts_1.Engine.random(max);
    }
    static rotate(image, degrees) {
        return Engine_ts_1.Engine.rotate(image, degrees);
    }
    static save(data, namespace) {
        Engine_ts_1.Engine.save(data, namespace);
    }
    static setAutoScale(autoScale) {
        Engine_ts_1.Engine.setAutoScale(autoScale);
    }
    static setFrameTime(frameTime) {
        Engine_ts_1.Engine.setFrameTime(frameTime);
    }
    static setKeepAspect(keepAspect) {
        Engine_ts_1.Engine.setKeepAspect(keepAspect);
    }
    static setName(name) {
        Engine_ts_1.Engine.setName(name);
    }
    static stopTheme() {
        Engine_ts_1.Engine.stopTheme();
    }
    // factories
    static animation(frames) {
        return new Animation(frames);
    }
    static frame(image, duration) {
        return new Frame_ts_1.Frame(image, duration);
    }
    static point(x, y) {
        return new Point_ts_1.Point(x, y);
    }
    static rect(x, y, width, height) {
        return new Rect_ts_1.Rect(x, y, width, height);
    }
    static scene() {
        return new Scene_ts_1.Scene();
    }
    static sprite(scene) {
        return new Sprite_ts_1.Sprite(scene);
    }
}
exports.Core2D = Core2D;
//# sourceMappingURL=Core2D.js.map