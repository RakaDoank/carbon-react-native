import {
	StyleSheet,
} from "react-native"

export const { h_auto } = StyleSheet.create({
	h_auto: {
		height: "auto",
	} as const,
})

export const { h_full } = StyleSheet.create({
	h_full: {
		height: "100%",
	} as const,
})

export const { max_h_auto } = StyleSheet.create({
	max_h_auto: {
		maxHeight: "auto",
	} as const,
})

export const { max_h_full } = StyleSheet.create({
	max_h_full: {
		maxHeight: "100%",
	} as const,
})
