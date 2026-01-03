import type {
	ActionableInlineVariantProps,
} from "../../_variants/actionable-inline"

export interface ErrorProps extends Omit<ActionableInlineVariantProps, "icon"> {
	iconProps?: Omit<
		NonNullable<ActionableInlineVariantProps["iconProps"]>,
		| "color"
	>,
	iconCloseProps?: Omit<
		NonNullable<ActionableInlineVariantProps["iconCloseProps"]>,
		| "color"
	>,
}
