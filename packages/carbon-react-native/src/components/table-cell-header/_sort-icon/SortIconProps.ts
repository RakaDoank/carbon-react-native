import type {
	TableCellIconProps,
} from "../../table-cell-icon/TableCellIconProps"

import type {
	TableCellHeaderSort,
} from "../TableCellHeaderSort"

export interface SortIconProps extends Omit<TableCellIconProps, "Icon"> {
	type: TableCellHeaderSort,
}
