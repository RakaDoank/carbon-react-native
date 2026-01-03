import type {
	CalloutInlineVariantProps,
} from "../../_variants/callout-inline"

export interface SuccessProps extends Omit<CalloutInlineVariantProps, "icon"> {
	iconProps?: Omit<
		NonNullable<CalloutInlineVariantProps["iconProps"]>,
		| "color"
	>,
	iconCloseProps?: Omit<
		NonNullable<CalloutInlineVariantProps["iconCloseProps"]>,
		| "color"
	>,
}
