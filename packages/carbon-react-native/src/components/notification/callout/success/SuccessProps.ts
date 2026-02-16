import type {
	CalloutVariantProps,
} from "../../_variants/callout/CalloutVariantProps"

export interface SuccessProps extends Omit<CalloutVariantProps, "Icon"> {
	iconProps?: Omit<
		NonNullable<CalloutVariantProps["iconProps"]>,
		| "color"
	>,
	iconCloseProps?: Omit<
		NonNullable<CalloutVariantProps["iconCloseProps"]>,
		| "color"
	>,
}
