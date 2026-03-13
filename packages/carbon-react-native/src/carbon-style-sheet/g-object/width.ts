import type {
	ViewStyle,
} from "react-native"

export const w_auto = {
	width: "auto",
} as const satisfies ViewStyle

export const w_full = {
	width: "100%",
} as const satisfies ViewStyle

export const max_w_auto = {
	width: "auto",
} as const satisfies ViewStyle

export const max_w_full = {
	width: "100%",
} as const satisfies ViewStyle
