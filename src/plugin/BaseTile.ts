import { Sprite } from '../Sprite';

export class BaseTile extends Sprite {
	constructor(id) {
		super();
		this.setImage(id);
	}
}
