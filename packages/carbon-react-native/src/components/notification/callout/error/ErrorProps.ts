import type {
	CalloutVariantProps,
} from "../../_variants/callout"

export interface ErrorProps extends Omit<CalloutVariantProps, "Icon"> {
	iconProps?: Omit<
		NonNullable<CalloutVariantProps["iconProps"]>,
		| "color"
	>,
	iconCloseProps?: Omit<
		NonNullable<CalloutVariantProps["iconCloseProps"]>,
		| "color"
	>,
}
