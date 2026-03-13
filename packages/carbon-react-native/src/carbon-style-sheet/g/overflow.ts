import {
	StyleSheet,
} from "react-native"

export const { overflow_hidden } = StyleSheet.create({
	overflow_hidden: {
		overflow: "hidden",
	} as const,
})

export const { overflow_scroll } = StyleSheet.create({
	overflow_scroll: {
		overflow: "scroll",
	} as const,
})

export const { overflow_visible } = StyleSheet.create({
	overflow_visible: {
		overflow: "visible",
	} as const,
})
