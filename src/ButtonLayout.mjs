"use strict";

import { Static } from "./Static.mjs";

export const ButtonLayout = {
	reversed: Static.makeEnum([
		"B",
		"A",
		"Y",
		"X",
		"L1",
		"R1",
		"L2",
		"R2",
		"SELECT",
		"START",
		"L3",
		"R3",
		"UP",
		"DOWN",
		"LEFT",
		"RIGHT",
	]),

	standard: Static.makeEnum([
		"A",
		"B",
		"X",
		"Y",
		"L1",
		"R1",
		"L2",
		"R2",
		"SELECT",
		"START",
		"L3",
		"R3",
		"UP",
		"DOWN",
		"LEFT",
		"RIGHT",
	])
};
