import type {
	ToastVariantProps,
} from '../../_variants/toast'

export interface InformationalProps extends Omit<ToastVariantProps, 'Icon'> {
	iconProps?: Omit<
		NonNullable<ToastVariantProps['iconProps']>,
		| 'color'
	>,
	iconCloseProps?: Omit<
		NonNullable<ToastVariantProps['iconCloseProps']>,
		| 'color'
	>,
}
