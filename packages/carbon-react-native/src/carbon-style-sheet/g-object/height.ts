import type {
	ViewStyle,
} from "react-native"

export const h_auto = {
	height: "auto",
} as const satisfies ViewStyle

export const h_full = {
	height: "100%",
} as const satisfies ViewStyle

export const max_h_auto = {
	maxHeight: "auto",
} as const satisfies ViewStyle

export const max_h_full = {
	maxHeight: "100%",
} as const satisfies ViewStyle
