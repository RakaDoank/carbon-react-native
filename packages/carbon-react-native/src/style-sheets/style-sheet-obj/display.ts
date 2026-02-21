import type {
	ViewStyle,
} from "react-native"

export const Display = {
	hidden: {
		display: "none",
	},
	flex: {
		display: "flex",
	},
} as const satisfies Record<string, ViewStyle>
