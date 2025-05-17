import type {
	ActionableVariantProps,
} from '../../_variants/actionable'

export interface SuccessProps extends Omit<ActionableVariantProps, 'icon'> {
	iconProps?: Omit<
		NonNullable<ActionableVariantProps['iconProps']>,
		| 'color'
	>,
	iconCloseProps?: Omit<
		NonNullable<ActionableVariantProps['iconCloseProps']>,
		| 'color'
	>,
}
