import type {
	ViewProps,
} from "react-native"

import type {
	TextProps,
} from "../text"

export interface FormLabelProps extends Omit<ViewProps, "children"> {
	label: string,
	labelLeading?: React.ReactNode,
	labelTrailing?: React.ReactNode,
	textProps?: Omit<
		TextProps,
		| "aria-label"
	>,
}
