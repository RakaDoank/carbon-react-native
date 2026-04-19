import {
	StyleSheet,
	type ViewStyle,
} from "react-native"

import type {
	TableRowSize,
} from "./TableRowSize"

/**
 * Shared style sheet for `TableRow` and `TableRowHeader`
 */
export const StyleSheetHeight =
	StyleSheet.create({
		extra_small: {
			height: 24,
		},
		small: {
			height: 32,
		},
		medium: {
			height: 40,
		},
		large: {
			height: 48,
		},
		extra_large: {
			height: 64,
		},
	} as const satisfies Record<TableRowSize, Pick<ViewStyle, "height">>)
