import {
	createContext,
} from "react"

import type {
	TableBatchActionBarSize,
} from "./TableBatchActionBarSize"

export interface TableBatchActionBarContext {
	size: TableBatchActionBarSize,
}

export const TableBatchActionBarContext = createContext<TableBatchActionBarContext>({
	size: "large",
})
