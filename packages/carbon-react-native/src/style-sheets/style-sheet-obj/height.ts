import type {
	ViewStyle,
} from "react-native"

export const Height = {
	h_full: {
		height: "100%",
	},
	h_auto: {
		width: "auto",
	},
	max_h_full: {
		maxHeight: "100%",
	},
} as const satisfies Record<string, ViewStyle>
