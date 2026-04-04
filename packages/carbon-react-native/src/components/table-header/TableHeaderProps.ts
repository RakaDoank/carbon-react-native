import type {
	BoxProps,
} from "../box/BoxProps"

import type {
	TextProps,
} from "../text/TextProps"

export interface TableHeaderProps extends Omit<BoxProps, "children"> {
	title: string,
	description?: string,
	titleProps?: Omit<
		TextProps,
		| "type"
		| "children"
	>,
	descriptionProps?: Omit<
		TextProps,
		| "type"
		| "children"
	>,
}
