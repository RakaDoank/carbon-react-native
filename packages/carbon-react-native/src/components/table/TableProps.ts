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
}
