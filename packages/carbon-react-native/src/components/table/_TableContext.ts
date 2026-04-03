import {
	createContext,
} from "react"

import type {
	TableRowSize,
} from "../table-row/TableRowSize"

export interface TableContext {
	rowSize: TableRowSize,
}

export const TableContext = createContext<TableContext>({
	rowSize: "large",
})
