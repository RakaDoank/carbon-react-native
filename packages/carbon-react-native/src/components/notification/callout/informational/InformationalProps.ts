import type {
	CalloutVariantProps,
} from '../../_variants/callout'

export interface InformationalProps extends Omit<CalloutVariantProps, 'icon'> {
	iconProps?: Omit<
		NonNullable<CalloutVariantProps['iconProps']>,
		| 'color'
	>,
	iconCloseProps?: Omit<
		NonNullable<CalloutVariantProps['iconCloseProps']>,
		| 'color'
	>,
}
