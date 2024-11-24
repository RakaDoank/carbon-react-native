/**
 * Initially, it was using @carbon/motion
 */

/**
 * In milliseconds  
 * https://carbondesignsystem.com/elements/motion/overview/#duration-tokens
 */
export const Durations = {
	fast_01: 70,
	fast_02: 110,
	moderate_01: 150,
	moderate_02: 240,
	slow_01: 400,
	slow_02: 700,
} as const

/**
 * https://carbondesignsystem.com/elements/motion/overview/#easing
 */
export const Easings = {
	Standard: {
		Productive: { x1: 0.2, y1: 0, x2: 0.38, y2: 0.9 },
		Expressive: { x1: 0.4, y1: 0.14, x2: 0.3, y2: 1 },
	},
	Entrance: {
		Productive: { x1: 0, y1: 0, x2: 0.38, y2: 0.9 },
		Expressive: { x1: 0, y1: 0, x2: 0.3, y2: 1 },
	},
	Exit: {
		Productive: { x1: 0.2, y1: 0, x2: 1, y2: 0.9 },
		Expressive: { x1: 0.4, y1: 0.14, x2: 1, y2: 1 },
	},
} as const
