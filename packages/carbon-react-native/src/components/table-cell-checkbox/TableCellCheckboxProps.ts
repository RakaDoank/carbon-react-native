import type {
	CheckboxInputProps,
} from "../checkbox-input/CheckboxInputProps"

import type {
	TableCellProps,
} from "../table-cell/TableCellProps"

import type {
	TableCellCheckboxInteractiveState,
} from "./TableCellCheckboxInteractiveState"

type PickedCheckboxInputProps = Pick<
	CheckboxInputProps,
	| "defaultChecked"
	| "checked"
	| "onChange"
>

export interface TableCellCheckboxProps extends Omit<TableCellProps, "children">, PickedCheckboxInputProps {
	/**
	 * For `normal` and `disabled`, pass it from the `TableRow`, or `TableRowCollapsible`
	 */
	interactiveState?: TableCellCheckboxInteractiveState,
	checkboxInputProps?: Omit<CheckboxInputProps, keyof PickedCheckboxInputProps>,
}
