import type {
	ViewStyle,
} from "react-native"

export const overflow_hidden = {
	overflow: "hidden",
} as const satisfies ViewStyle

export const overflow_scroll = {
	overflow: "scroll",
} as const satisfies ViewStyle

export const overflow_visible = {
	overflow: "visible",
} as const satisfies ViewStyle
