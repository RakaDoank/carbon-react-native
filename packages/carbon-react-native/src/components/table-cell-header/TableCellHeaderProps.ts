import type {
	PressableProps,
} from "react-native"

import type {
	TableCellProps,
} from "../table-cell/TableCellProps"

import type {
	TableCellHeaderSort,
} from "./TableCellHeaderSort"

export interface TableCellHeaderProps extends
	Omit<
		PressableProps,
		| "children"
		| "style"
	>,
	TableCellProps
{
	/**
	 * Render the sort icon either ascending (arrow up), or descending (arrow up rotated), or none (arrows vertical).
	 * 
	 * This is just an icon rendering, you have to sort your actual data manually.
	 */
	defaultSort?: TableCellHeaderSort,
	/**
	 * Render the sort icon either ascending (arrow up), or descending (arrow up rotated), or none (arrows vertical).
	 * 
	 * This is just an icon rendering, you have to sort your actual data manually.
	 */
	sort?: TableCellHeaderSort,
	onChangeSort?: (sort: TableCellHeaderSort) => void,
}
