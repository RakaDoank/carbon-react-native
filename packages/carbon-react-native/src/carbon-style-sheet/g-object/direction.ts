import type {
	ViewStyle,
} from "react-native"

export const ltr = {
	direction: "ltr",
} as const satisfies ViewStyle

export const rtl = {
	direction: "rtl",
} as const satisfies ViewStyle
