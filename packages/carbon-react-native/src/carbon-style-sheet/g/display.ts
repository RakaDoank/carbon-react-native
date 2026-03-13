import {
	StyleSheet,
} from "react-native"

export const { hidden } = StyleSheet.create({
	hidden: {
		display: "none",
	} as const,
})

export const { flex } = StyleSheet.create({
	flex: {
		display: "flex",
	} as const,
})
