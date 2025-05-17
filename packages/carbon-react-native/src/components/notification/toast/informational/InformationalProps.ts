import type {
	ToastVariantProps,
} from '../../_variants/toast'

export interface InformationalProps extends Omit<ToastVariantProps, 'icon'> {
	iconProps?: Omit<
		NonNullable<ToastVariantProps['iconProps']>,
		| 'color'
	>,
	iconCloseProps?: Omit<
		NonNullable<ToastVariantProps['iconCloseProps']>,
		| 'color'
	>,
}
