import type {
	ViewStyle,
} from "react-native"

export const hidden = {
	display: "none",
} as const satisfies ViewStyle

export const flex = {
	display: "flex",
} as const satisfies ViewStyle
