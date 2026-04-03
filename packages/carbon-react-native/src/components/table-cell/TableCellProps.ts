import type {
	ViewProps,
} from "react-native"

import type {
	TableCellTextProps,
} from "../table-cell-text/TableCellTextProps"

export interface TableCellProps extends ViewProps {
	/**
	 * Fixed width of the cell used to ensure consistent column alignment across rows.
	 * 
	 * Sets an explicit width for the cell (in pixels) and
	 * acts as a column constraint. This helps simulate
	 * table-like behavior, since React Native relies on
	 * flexbox and does not provide native table layout.
	 * Without this, cells in the same column may render
	 * with inconsistent widths across different rows.
	 */
	width?: number,
	/**
	 * Provide text to the cell.
	 * 
	 * As an alternative, you can use `TableCellText` as a child of this component.
	 * 
	 * `children` prop takes over precedence over this prop.
	 */
	text?: string,
	/**
	 * Only applies if you use the `text` prop instead of `children`
	 */
	textProps?: Omit<TableCellTextProps, "children">,
}
