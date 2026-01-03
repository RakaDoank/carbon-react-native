import type {
	EasingFunction,
	ViewProps,
} from "react-native"

export interface CollapsibleProps extends ViewProps {
	defaultOpen?: boolean,
	open?: boolean,
	motion?: Record<"toOpen" | "toClose", {
		duration: number,
		easing?: EasingFunction,
	}>,
	contentContainerStyle?: ViewProps["style"],
	onToggle?: (value: boolean) => void,
	onOpened?: () => void,
	onClosed?: () => void,
}
