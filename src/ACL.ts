
interface Document {
	getElementById: (id: string) => Object
	getElementsByTagName: (name: string) => (Object | null)[]
}

interface LocalStorage { }

interface Navigator {
	getGamepads: () => (Gamepad | null)[]
}

interface Window {
	focus: () => void
	innerHeight: number
	innerWidth: number
	requestAnimationFrame: () => number
}

if (typeof (global) != 'undefined') {
	global.addEventListener = () => { };

	global.document = global.document ?? ({
		getElementById: (id: string) => {
			if (id == 'game') {
				return {
					focus: () => { },
					getContext: () => {
						return {
							fillRect: () => { },
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
	} as Document);

	(global as any).document = {
	};

	global.localStorage = global.localStorage ?? ({} as LocalStorage);
	global.navigator = global.navigator ?? ({} as Navigator);

	global.window = global.window ?? ({
		focus: () => { },
		innerHeight: 600,
		innerWidth: 800,
		requestAnimationFrame: () => 1
	} as Window);
}

export const ACL = {
	document,
	window,
};
