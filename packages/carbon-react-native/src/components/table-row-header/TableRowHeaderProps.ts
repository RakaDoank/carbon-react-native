import type {
	BoxProps,
} from "../box/BoxProps"

import type {
	TableRowProps,
} from "../table-row/TableRowProps"

export interface TableRowHeaderProps extends
	BoxProps,
	Pick<TableRowProps, "size">
{
}
