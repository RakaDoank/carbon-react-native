import type {
	ScrollViewProps,
} from "react-native"

import type {
	BoxProps,
} from "../box/BoxProps"

import type {
	TableRowSize,
} from "../table-row/TableRowSize"

export interface TableProps extends BoxProps {
	/**
	 * @default "large"
	 * @see https://carbondesignsystem.com/components/data-table/style/#rows
	 */
	rowSize?: TableRowSize,
	horizontalScrollViewProps?: Omit<
		ScrollViewProps,
		| "children"
	>,
	verticalScrollViewProps?: Omit<
		ScrollViewProps,
		| "children"
	>,
	/**
	 * Add React node after start of the table element.
	 * 
	 * You may use this for `TableHeader`, `TableToolbar`, `TableBatchActionBar`, or all of them.
	 */
	header?: React.ReactNode,
	/**
	 * Add React node before end of the table element
	 * 
	 * You may use this for `Pagination` component.
	 */
	footer?: React.ReactNode,
}
