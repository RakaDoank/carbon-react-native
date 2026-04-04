import {
	createContext,
} from "react"

import type {
	TableToolbarSize,
} from "./TableToolbarSize"

export interface TableToolbarContext {
	size: TableToolbarSize,
}

export const TableToolbarContext = createContext<TableToolbarContext>({
	size: "large",
})
