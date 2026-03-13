import type {
	TextStyle,
} from "react-native"

export const text_center = {
	textAlign: "center",
} as const satisfies TextStyle

export const text_left = {
	textAlign: "left",
} as const satisfies TextStyle

export const text_right = {
	textAlign: "right",
} as const satisfies TextStyle

export const underline = {
	textDecorationLine: "underline",
} as const satisfies TextStyle

export const line_through = {
	textDecorationLine: "line-through",
} as const satisfies TextStyle

export const no_underline = {
	textDecorationLine: "none",
} as const satisfies TextStyle

export const align_auto = {
	verticalAlign: "auto",
} as const satisfies TextStyle

export const align_top = {
	verticalAlign: "top",
} as const satisfies TextStyle

export const align_middle = {
	verticalAlign: "middle",
} as const satisfies TextStyle

export const align_bottom = {
	verticalAlign: "bottom",
} as const satisfies TextStyle
