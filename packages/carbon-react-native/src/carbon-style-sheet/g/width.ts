import {
	StyleSheet,
} from "react-native"

import {
	Breakpoint,
} from "@audira/carbon-react-native-elements"

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

// +++ Element Breakpoint +++
export const { w_small } = StyleSheet.create({
	w_small: {
		width: Breakpoint.small.value.px,
	} as const,
})

export const { w_medium } = StyleSheet.create({
	w_medium: {
		width: Breakpoint.medium.value.px,
	} as const,
})

export const { w_large } = StyleSheet.create({
	w_large: {
		width: Breakpoint.large.value.px,
	} as const,
})

export const { w_x_large } = StyleSheet.create({
	w_x_large: {
		width: Breakpoint.x_large.value.px,
	} as const,
})

export const { w_max } = StyleSheet.create({
	w_max: {
		width: Breakpoint.max.value.px,
	} as const,
})

export const { max_w_small } = StyleSheet.create({
	max_w_small: {
		maxWidth: Breakpoint.small.value.px,
	} as const,
})

export const { max_w_medium } = StyleSheet.create({
	max_w_medium: {
		maxWidth: Breakpoint.medium.value.px,
	} as const,
})

export const { max_w_large } = StyleSheet.create({
	max_w_large: {
		maxWidth: Breakpoint.large.value.px,
	} as const,
})

export const { max_w_x_large } = StyleSheet.create({
	max_w_x_large: {
		maxWidth: Breakpoint.x_large.value.px,
	} as const,
})

export const { max_w_max } = StyleSheet.create({
	max_w_max: {
		maxWidth: Breakpoint.max.value.px,
	} as const,
})
// --- Element Breakpoint ---
