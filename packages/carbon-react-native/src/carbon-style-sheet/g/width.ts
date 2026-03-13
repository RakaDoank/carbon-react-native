import {
	StyleSheet,
} from "react-native"

export const { w_auto } = StyleSheet.create({
	w_auto: {
		width: "auto",
	} as const,
})

export const { w_full } = StyleSheet.create({
	w_full: {
		width: "100%",
	} as const,
})

export const { max_w_auto } = StyleSheet.create({
	max_w_auto: {
		maxWidth: "auto",
	} as const,
})

export const { max_w_full } = StyleSheet.create({
	max_w_full: {
		maxWidth: "100%",
	} as const,
})
