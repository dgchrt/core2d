"use strict";

import { Sprite } from "../Sprite.mjs";

export 	class BaseTile extends Sprite {
	constructor(id) {
		super();
		this.setImage(id);
	}
}
