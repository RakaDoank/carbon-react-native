import type {
	ViewStyle,
} from "react-native"

export const absolute = {
	position: "absolute",
} as const satisfies ViewStyle

export const relative = {
	position: "relative",
} as const satisfies ViewStyle

/**
 * Underscore added at the end because `static` is reserved word.
 */
export const static_ = {
	position: "static",
} as const satisfies ViewStyle
