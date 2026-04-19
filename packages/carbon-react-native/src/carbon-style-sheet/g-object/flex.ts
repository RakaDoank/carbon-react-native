import type {
	ViewStyle,
} from "react-native"

export const flex_1 = {
	flexGrow: 1,
	flexShrink: 1,
	flexBasis: 0,
} as const satisfies ViewStyle

export const flex_auto = {
	flexGrow: 1,
	flexShrink: 1,
	flexBasis: "auto",
} as const satisfies ViewStyle

export const flex_initial = {
	flexGrow: 0,
	flexShrink: 1,
	flexBasis: "auto",
} as const satisfies ViewStyle

export const flex_col = {
	flexDirection: "column",
} as const satisfies ViewStyle

export const flex_col_reverse = {
	flexDirection: "column-reverse",
} as const satisfies ViewStyle

export const flex_row = {
	flexDirection: "row",
} as const satisfies ViewStyle

export const flex_row_reverse = {
	flexDirection: "row-reverse",
} as const satisfies ViewStyle

export const flex_wrap = {
	flexWrap: "wrap",
} as const satisfies ViewStyle

export const flex_wrap_reverse = {
	flexWrap: "wrap-reverse",
} as const satisfies ViewStyle

export const flex_nowrap = {
	flexWrap: "nowrap",
} as const satisfies ViewStyle

export const items_start = {
	alignItems: "flex-start",
} as const satisfies ViewStyle

export const items_center = {
	alignItems: "center",
} as const satisfies ViewStyle

export const items_end = {
	alignItems: "flex-end",
} as const satisfies ViewStyle

export const items_stretch = {
	alignItems: "stretch",
} as const satisfies ViewStyle

export const content_start = {
	alignContent: "flex-start",
} as const satisfies ViewStyle

export const content_center = {
	alignContent: "center",
} as const satisfies ViewStyle

export const content_end = {
	alignContent: "flex-end",
} as const satisfies ViewStyle

export const justify_start = {
	justifyContent: "flex-start",
} as const satisfies ViewStyle

export const justify_center = {
	justifyContent: "center",
} as const satisfies ViewStyle

export const justify_between = {
	justifyContent: "space-between",
} as const satisfies ViewStyle

export const justify_end = {
	justifyContent: "flex-end",
} as const satisfies ViewStyle

export const self_start = {
	alignSelf: "flex-start",
} as const satisfies ViewStyle

export const self_center = {
	alignSelf: "center",
} as const satisfies ViewStyle

export const self_end = {
	alignSelf: "flex-end",
} as const satisfies ViewStyle

export const self_stretch = {
	alignSelf: "stretch",
} as const satisfies ViewStyle

export const grow = {
	flexGrow: 1,
} as const satisfies ViewStyle

export const grow_0 = {
	flexGrow: 0,
} as const satisfies ViewStyle

export const shrink = {
	flexShrink: 1,
} as const satisfies ViewStyle

export const shrink_0 = {
	flexShrink: 0,
} as const satisfies ViewStyle

export const basis_auto = {
	flexBasis: "auto",
} as const satisfies ViewStyle

export const basis_full = {
	flexBasis: "100%",
} as const satisfies ViewStyle
