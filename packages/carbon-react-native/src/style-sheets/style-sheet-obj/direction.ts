import type {
	ViewStyle,
} from "react-native"

export const Direction = {
	ltr: {
		direction: "ltr",
	},
	rtl: {
		direction: "rtl",
	},
	inherit: {
		direction: "inherit",
	},
} as const satisfies Record<string, ViewStyle>
