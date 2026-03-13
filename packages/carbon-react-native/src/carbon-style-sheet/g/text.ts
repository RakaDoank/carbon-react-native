import {
	StyleSheet,
} from "react-native"

export const { text_center } = StyleSheet.create({
	text_center: {
		textAlign: "center",
	} as const,
})

export const { text_left } = StyleSheet.create({
	text_left: {
		textAlign: "left",
	} as const,
})

export const { text_right } = StyleSheet.create({
	text_right: {
		textAlign: "right",
	} as const,
})

export const { underline } = StyleSheet.create({
	underline: {
		textDecorationLine: "underline",
	} as const,
})

export const { line_through } = StyleSheet.create({
	line_through: {
		textDecorationLine: "line-through",
	} as const,
})

export const { no_underline } = StyleSheet.create({
	no_underline: {
		textDecorationLine: "none",
	} as const,
})

export const { align_auto } = StyleSheet.create({
	align_auto: {
		verticalAlign: "auto",
	} as const,
})

export const { align_top } = StyleSheet.create({
	align_top: {
		verticalAlign: "top",
	} as const,
})

export const { align_middle } = StyleSheet.create({
	align_middle: {
		verticalAlign: "middle",
	} as const,
})

export const { align_bottom } = StyleSheet.create({
	align_bottom: {
		verticalAlign: "bottom",
	} as const,
})
