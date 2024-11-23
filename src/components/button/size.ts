export type Size =
	| 'SMALL'
	| 'MEDIUM'
	| 'LARGE_PRODUCTIVE'
	| 'LARGE_EXPRESSIVE'
	| 'EXTRA_LARGE'
	| 'XL2'

export const Size = {
	SMALL: 'SMALL',
	MEDIUM: 'MEDIUM',
	LARGE_PRODUCTIVE: 'LARGE_PRODUCTIVE',
	LARGE_EXPRESSIVE: 'LARGE_EXPRESSIVE',
	EXTRA_LARGE: 'EXTRA_LARGE',
	XL2: 'XL2',
} as const satisfies Record<Size, Size>
