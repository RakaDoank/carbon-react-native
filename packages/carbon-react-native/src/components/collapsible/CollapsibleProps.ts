import type {
	EasingFunction,
	ViewProps,
} from "react-native"

import type {
	ViewProps as RNWViewProps,
} from "react-native-web"

export interface CollapsibleProps extends ViewProps {
	open?: boolean,
	motion?: Record<"toOpen" | "toClose", {
		duration: number,
		easing?: EasingFunction,
	}>,
	dir?: RNWViewProps["dir"],
	contentContainerProps?: Omit<ViewProps, "children">,
	onToggle?: (value: boolean) => void,
	onOpened?: () => void,
	onClosed?: () => void,
}
