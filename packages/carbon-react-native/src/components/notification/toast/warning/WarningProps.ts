import type {
	ToastVariantProps,
} from "../../_variants/toast"

export interface WarningProps extends Omit<ToastVariantProps, "Icon"> {
	iconProps?: Omit<
		NonNullable<ToastVariantProps["iconProps"]>,
		| "color"
	>,
	iconCloseProps?: Omit<
		NonNullable<ToastVariantProps["iconCloseProps"]>,
		| "color"
	>,
}
