export type Size =
	| 'small'
	| 'medium'
	| 'large_productive'
	| 'large_expressive'
	| 'extra_large'
	| '2xl'

export const Size = {
	SMALL: 'small',
	MEDIUM: 'medium',
	LARGE_PRODUCTIVE: 'large_productive',
	LARGE_EXPRESSIVE: 'large_expressive',
	EXTRA_LARGE: 'extra_large',
	XL2: '2xl',
} as const satisfies Record<string, Size>
