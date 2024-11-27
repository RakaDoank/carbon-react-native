export type Size =
	| 'small'
	| 'medium'
	| 'large'

export const Size = {
	SMALL: 'small',
	MEDIUM: 'medium',
	LARGE: 'large',
} as const satisfies Record<string, Size>
