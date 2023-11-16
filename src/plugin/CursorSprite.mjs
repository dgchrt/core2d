"use strict";

import { Core2D } from "../Core2D.mjs";
import { Rect } from "../Rect.mjs";
import { Sprite } from "../Sprite.mjs";

export 	class CursorSprite extends Sprite {
	constructor() {
		super();
		this.hovering = null;
		this.pointer = Core2D.getPointer();
		this.setSolid();
	}

	check(sprite) {
		const FOCUS = new Rect(this.getLeft(), this.getTop(), 1, 1);
		return sprite.hasCollision(FOCUS);
	}

	onCollision(sprite) {
		if (sprite.hasTag("clickable") && this.check(sprite)) {
			if (this.hovering != sprite) {
				if (this.hovering) {
					this.hovering.onHoverOut();
				}

				this.hovering = sprite;
				sprite.onHoverIn();
			}
		}
	}

	update() {
		this.setPosition(this.pointer);

		if (this.hovering) {
			if (!this.hasCollision(this.hovering)) {
				this.hovering.onHoverOut();
				this.hovering = null;
			} else if (this.pointer.getPush()) {
				this.hovering.onClick();
			}
		}
	}
}
