import type {
	EasingFunction,
	ViewProps,
} from "react-native"

export interface CollapsibleProps extends ViewProps {
	open?: boolean,
	motion?: Record<"toOpen" | "toClose", {
		duration: number,
		easing?: EasingFunction,
	}>,
	contentContainerProps?: Omit<ViewProps, "children">,
	onToggle?: (value: boolean) => void,
	onOpened?: () => void,
	onClosed?: () => void,
}
