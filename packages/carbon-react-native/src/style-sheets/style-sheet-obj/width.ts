import type {
	ViewStyle,
} from "react-native"

export const Width = {
	w_full: {
		width: "100%",
	},
	w_auto: {
		width: "auto",
	},
	max_w_full: {
		maxWidth: "100%",
	},
} as const satisfies Record<string, ViewStyle>
