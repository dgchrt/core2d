"use strict";

if (global) {
	global.addEventListener = () => {};

	global.document = {
		getElementById: (id) => {
			if (id == "game") {
				return {
					focus: () => {},

					getContext: () => {
						return {
							fillRect: () => {},
						};
					},

					height: 400,
					offsetLeft: 0,
					offsetTop: 0,
					style: {},
					width: 640,
				};
			}

			return {};
		},
		getElementsByTagName: () => {
			return [];
		}
	};

	global.localStorage = {};
	global.navigator = {};

	global.window = {
		focus: () => {},
		innerHeight: 600,
		innerWidth: 800,
		requestAnimationFrame: () => true
	};
}

export const ACL = {
	document,
	window,
};
