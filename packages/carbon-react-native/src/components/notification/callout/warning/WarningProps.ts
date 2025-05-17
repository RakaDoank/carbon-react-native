import type {
	CalloutVariantProps,
} from '../../_variants/callout'

export interface WarningProps extends Omit<CalloutVariantProps, 'icon'> {
	iconProps?: Omit<
		NonNullable<CalloutVariantProps['iconProps']>,
		| 'color'
	>,
	iconCloseProps?: Omit<
		NonNullable<CalloutVariantProps['iconCloseProps']>,
		| 'color'
	>,
}
