import {
	createContext,
} from "react"

import type {
	TableRowInteractiveState,
} from "./TableRowInteractiveState"

export interface TableRowContext {
	interactiveState: TableRowInteractiveState,
	hovered: boolean,
}

export const TableRowContext = createContext<TableRowContext>({
	interactiveState: "normal",
	hovered: false,
})
