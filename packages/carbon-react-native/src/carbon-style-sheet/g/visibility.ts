import {
	Platform,
	StyleSheet,
} from "react-native"

export const { invisible } = StyleSheet.create({
	invisible: {
		...Platform.select({
			web: {
				visibility: "hidden",
			} as const,
			default: {
				opacity: 0,
				pointerEvents: "none",
			} as const,
		}),
	},
})

export const { visible } = StyleSheet.create({
	visible: {
		...Platform.select({
			web: {
				visibility: "visible",
			} as const,
			default: {
				opacity: 1,
				pointerEvents: "auto",
			} as const,
		}),
	},
})
