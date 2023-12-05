'use static';

import { Sprite } from '../Sprite';

export class ClickableSprite extends Sprite {
	constructor() {
		super();
		this.addTag('clickable');
		this.setSolid();
	}

	onClick() {
		// no default behavior
	}

	onHoverIn() {
		// no default behavior
	}

	onHoverOut() {
		// no default behavior
	}
}

