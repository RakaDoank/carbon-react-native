import type {
	BoxProps,
} from "../box"

import type {
	TextProps,
} from "../text"

export interface FormLabelProps extends Omit<BoxProps, "children"> {
	label: string,
	labelLeading?: React.ReactNode,
	labelTrailing?: React.ReactNode,
	textProps?: Omit<
		TextProps,
		| "aria-label"
	>,
}
