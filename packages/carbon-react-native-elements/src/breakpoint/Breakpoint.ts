import type {
	BreakpointData,
	BreakpointToken,
} from "../types"

export const Breakpoint: Record<BreakpointToken, BreakpointData> = {
	small: {
		value: {
			px: 320,
			rem: 20,
		},
		columns: 4,
		size: {
			percent: 0.25,
			px: 80,
		},
		padding: 16,
		margin: 0,
	},
	medium: {
		value: {
			px: 672,
			rem: 42,
		},
		columns: 8,
		size: {
			percent: 0.125,
			px: 80,
		},
		padding: 16,
		margin: 16,
	},
	large: {
		value: {
			px: 1056,
			rem: 66,
		},
		columns: 16,
		size: {
			percent: 0.0625,
			px: 64,
		},
		padding: 16,
		margin: 16,
	},
	x_large: {
		value: {
			px: 1312,
			rem: 82,
		},
		columns: 16,
		size: {
			percent: 0.0625,
			px: 80,
		},
		padding: 16,
		margin: 16,
	},
	max: {
		value: {
			px: 1584,
			rem: 99,
		},
		columns: 16,
		size: {
			percent: 0.0625,
			px: 96,
		},
		padding: 16,
		margin: 24,
	},
}
