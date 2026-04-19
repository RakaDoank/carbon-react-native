import type {
	PressableProps,
} from "react-native"

import type {
	TableCellProps,
} from "../../table-cell/TableCellProps"

export interface TableCellChevronProps extends Omit<TableCellProps, "children"> {
	open: boolean,
	invisible: boolean,
	pressableProps?: Omit<PressableProps, "children" | "style">,
}
