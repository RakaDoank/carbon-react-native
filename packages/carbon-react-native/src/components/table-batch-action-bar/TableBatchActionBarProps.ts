import type {
	ScrollViewProps,
} from "react-native"

import type {
	TextProps,
} from "../text/TextProps"

import type {
	TableBatchActionBarSize,
} from "./TableBatchActionBarSize"

export interface TableBatchActionBarProps extends Omit<ScrollViewProps, "children"> {
	/**
	 * Based on the IBM spec, the `large` batch action bar is paired with the extra large and large row sizes.
	 * The `small` batch action bar is paired with the small and extra small row sizes.
	 * 
	 * You may don't want to set the batch action bar size manually.
	 * Prefer to opt `rowSize` in the `Table` prop instead,
	 * and the batch action bar size will be adjusted automatically based on what the row size is.
	 * 
	 * @default "large"
	 */
	size?: TableBatchActionBarSize,
	/**
	 * Provide descriptive text after one or multiple items selected,
	 * 
	 * e.g. "0 items selected", "3 products selected", etc.
	 */
	text: string,
	textProps?: Omit<
		TextProps,
		| "children"
		| "type"
	>,
	/**
	 * Provide one or multiple `<TableBatchActionBarButton>` in this prop.
	 * 
	 * To provide multiple buttons, you can start it with `<>` or `<Fragment>`
	 */
	buttons: React.ReactNode,
}
