import type {
	ActionableInlineVariantProps,
} from '../../_variants/actionable-inline'

export interface WarningProps extends Omit<ActionableInlineVariantProps, 'icon'> {
	iconProps?: Omit<
		NonNullable<ActionableInlineVariantProps['iconProps']>,
		| 'color'
	>,
	iconCloseProps?: Omit<
		NonNullable<ActionableInlineVariantProps['iconCloseProps']>,
		| 'color'
	>,
}
