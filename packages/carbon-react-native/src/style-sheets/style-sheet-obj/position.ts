import type {
	ViewStyle,
} from "react-native"

export const Position = {
	absolute: {
		position: "absolute",
	},
	relative: {
		position: "relative",
	},
	static: {
		position: "static",
	},
} as const satisfies Record<string, ViewStyle>
