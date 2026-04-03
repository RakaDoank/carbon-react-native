import {
	createContext,
} from "react"

import type {
	TableRowSize,
} from "../table-row/TableRowSize"

export interface TableRowHeaderContext {
	inRowHeader: boolean,
	size: TableRowSize,
}

export const TableRowHeaderContext = createContext<TableRowHeaderContext>({
	// Have to provide false as initial value
	// to tell the `TableCellText` that it is not used inside of `TableRowHeader`
	inRowHeader: false,
	size: "large",
})
