import {
	createContext,
} from "react"

import type {
	TableRowInteractiveState,
} from "./TableRowInteractiveState"

export interface TableRowContext {
	interactiveState: TableRowInteractiveState,
	readonly selected: boolean,
	readonly hovered: boolean,
	setSelected: (value: boolean) => void,
}

export const TableRowContext = createContext<TableRowContext>({
	interactiveState: "normal",
	selected: false,
	hovered: false,
	setSelected() {
		// set it later
	},
})
