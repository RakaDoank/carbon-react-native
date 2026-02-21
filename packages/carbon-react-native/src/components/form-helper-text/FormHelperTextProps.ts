import type {
	BoxProps,
} from "../box"

import type {
	TextProps,
} from "../text"

export interface FormHelperTextProps extends Omit<BoxProps, "children"> {
	error?: boolean,
	text: string,
	textLeading?: React.ReactNode,
	textTrailing?: React.ReactNode,
	textProps?: Omit<TextProps, "children">,
}
