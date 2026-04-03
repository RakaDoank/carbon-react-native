import type {
	PressableProps,
	ViewProps,
} from "react-native"

import type {
	TableRowInteractiveState,
} from "./TableRowInteractiveState"

import type {
	TableRowSize,
} from "./TableRowSize"

export interface TableRowProps extends Omit<PressableProps, "style"> {
	/**
	 * @default "large"
	 * @see https://carbondesignsystem.com/components/data-table/style/#rows
	 */
	size?: TableRowSize,
	/**
	 * A row can use a zebra stripe modifier to style
	 * with alternating colors to make scanning
	 * horizontal information easier for the user.
	 * 
	 * If you want to use zebra stripe,
	 * ensure you are giving this prop true
	 * to every second row (even) started after header row
	 * 
	 * ===== Table =====
	 * 
	 * - Header Row
	 * - Row 1
	 * - Row 2 (zebra)
	 * - Row 3
	 * - Row 4 (zebra)
	 * 
	 * ===== Table =====
	 */
	zebra?: boolean,
	/**
	 * @default "normal"
	 */
	interactiveState?: TableRowInteractiveState,
	style?: ViewProps["style"],
}
