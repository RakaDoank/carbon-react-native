export type AccordionSize =
	| 'SMALL'
	| 'MEDIUM'
	| 'LARGE'

export const AccordionSize = {
	SMALL: 'SMALL',
	MEDIUM: 'MEDIUM',
	LARGE: 'LARGE',
} as const satisfies Record<AccordionSize, AccordionSize>
