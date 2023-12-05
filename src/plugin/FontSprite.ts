import { Core2D } from '../Core2D';
import { Sprite } from '../Sprite';

export class FontSprite extends Sprite {
	constructor(text = '') {
		super();
		this.font = '';
		this.text = text;
	}

	render(context) {
		Sprite.prototype.render.call(this, context) && this._parse(context);
	}

	setFont(font) {
		this.font = font;
	}

	setText(text) {
		this._text = text;
		this._parse();
		return this;
	}

	get text() {
		return this._text;
	}

	set text(text) {
		this.setText(text);
	}

	_parse(context) {
		const SPACE = 4;
		const SPACING = 0;
		let height = 0;
		let width = 0;
		let x = 0;
		let y = 0;

		for (let i = 0; i < this._text.length; ++i) {
			let character = this._text[i];

			if (character == ' ') {
				x += SPACE + SPACING;
			} else if (character == '\n') {
				x = 0;
				y += height + SPACING;
			} else {
				const IMAGE = Core2D.image(character + this.font + 'Font');

				if (context) {
					context.drawImage(IMAGE, this.x + this.scene.x + x, this.y + this.scene.y + y, IMAGE.width, IMAGE.height);
				}

				x += IMAGE.width + SPACING;

				if (x > width) {
					width = x;
				}

				if (IMAGE.height > height) {
					height = IMAGE.height;
				}
			}
		}

		this.setWidth(width);
		this.setHeight(y + height);
	}
}

