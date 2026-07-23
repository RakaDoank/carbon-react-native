import type {
	ViewStyle,
} from "react-native"

import {
	Breakpoint,
} from "@audira/carbon-react-native-elements"

export const w_auto = {
	width: "auto",
} as const satisfies ViewStyle

export const w_full = {
	width: "100%",
} as const satisfies ViewStyle

export const max_w_auto = {
	maxWidth: "auto",
} as const satisfies ViewStyle

export const max_w_full = {
	maxWidth: "100%",
} as const satisfies ViewStyle

// +++ Element Breakpoint +++
export const w_small = {
	width: Breakpoint.small.value.px,
} as const satisfies ViewStyle

export const w_medium = {
	width: Breakpoint.medium.value.px,
} as const satisfies ViewStyle

export const w_large = {
	width: Breakpoint.large.value.px,
} as const satisfies ViewStyle

export const w_x_large = {
	width: Breakpoint.x_large.value.px,
} as const satisfies ViewStyle

export const w_max = {
	width: Breakpoint.max.value.px,
} as const satisfies ViewStyle

export const max_w_small = {
	maxWidth: Breakpoint.small.value.px,
} as const satisfies ViewStyle

export const max_w_medium = {
	maxWidth: Breakpoint.medium.value.px,
} as const satisfies ViewStyle

export const max_w_large = {
	maxWidth: Breakpoint.large.value.px,
} as const satisfies ViewStyle

export const max_w_x_large = {
	maxWidth: Breakpoint.x_large.value.px,
} as const satisfies ViewStyle

export const max_w_max = {
	maxWidth: Breakpoint.max.value.px,
} as const satisfies ViewStyle
// --- Element Breakpoint ---
