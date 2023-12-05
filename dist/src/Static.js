"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Static = void 0;
const ACL_ts_1 = require("./ACL.ts");
class Static {
    static checkCollisions(sprites) {
        const LENGTH = sprites.length;
        for (let i = 0; i < LENGTH - 1; ++i) {
            const LEFT_SPRITE = sprites[i];
            for (let j = i + 1; j < LENGTH; ++j) {
                const RIGHT_SPRITE = sprites[j];
                if (LEFT_SPRITE.hasCollision(RIGHT_SPRITE)) {
                    LEFT_SPRITE.collided = true;
                    LEFT_SPRITE.onCollision(RIGHT_SPRITE);
                    RIGHT_SPRITE.collided = true;
                    RIGHT_SPRITE.onCollision(LEFT_SPRITE);
                }
            }
        }
    }
    static getElement(id) {
        return ACL_ts_1.ACL.document.getElementById(id);
    }
    static getElements(name) {
        return Array.from(ACL_ts_1.ACL.document.getElementsByTagName(name));
    }
    static getGamepads() {
        if (!navigator.getGamepads) {
            return [];
        }
        return navigator.getGamepads();
    }
    static getImage(image) {
        if ("string" == typeof (image)) {
            return this.getElement(image);
        }
        return image;
    }
    static makeEnum(array) {
        return this.makeHash(array, true);
    }
    static makeHash(array, indexed) {
        const RESULT = {};
        for (let i = 0; i < array.length; ++i) {
            const VALUE = array[i];
            RESULT[VALUE] = indexed ? i : VALUE;
        }
        return RESULT;
    }
    static toDegrees(radians) {
        return radians * 180 / Math.PI;
    }
    static toRadians(degrees) {
        return degrees * Math.PI / 180;
    }
}
exports.Static = Static;
