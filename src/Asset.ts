import { ACL } from "./ACL";

class Asset {
	static image(id: string): HTMLImageElement {
		const image = ACL.document.getElementById(id);

		if (!image) {
			throw `Image asset with id: "${id}" cannot be found.`;
		}

		return image as HTMLImageElement;
	}
}
