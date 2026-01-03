import type {
	ViewProps,
} from "react-native"

import type {
	AccordionHeaderProps,
} from "./AccordionHeaderProps"

export interface AccordionItemProps extends ViewProps {
	defaultOpen?: boolean,
	open?: boolean,
	title?: string,
	children?: React.ReactNode,
	onChange?: (open: boolean) => void,
	onPressHeader?: AccordionHeaderProps["onPress"],
	headerProps?: Omit<
		AccordionHeaderProps,
		| "open"
		| "size"
		| "text"
		| "flushAlignment"
		| "onPress"
	>
}
