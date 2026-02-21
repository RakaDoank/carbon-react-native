import type {
	ViewStyle,
} from "react-native"

export const Overflow = {
	overflow_hidden: {
		overflow: "hidden",
	},
	overflow_scroll: {
		overflow: "scroll",
	},
	overflow_visible: {
		overflow: "visible",
	},
} as const satisfies Record<string, ViewStyle>
