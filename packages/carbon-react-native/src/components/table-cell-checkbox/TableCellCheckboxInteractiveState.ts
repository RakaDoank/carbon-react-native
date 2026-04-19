import type {
	CheckboxInputInteractiveState,
} from "../checkbox-input/CheckboxInputInteractiveState"

import type {
	TableRowInteractiveState,
} from "../table-row/TableRowInteractiveState"

export type TableCellCheckboxInteractiveState =
	Exclude<
		CheckboxInputInteractiveState,
		TableRowInteractiveState
	>
