import type {
	PressableProps,
} from "react-native"

import type {
	BoxProps,
} from "../box/BoxProps"

import type {
	CollapsibleProps,
} from "../collapsible/CollapsibleProps"

import type {
	TableRowProps,
} from "../table-row/TableRowProps"

import type {
	TableCellChevronProps,
} from "./_table-cell-chevron/TableCellChevronProps"

type PickedCollapsibleProps = Pick<
	CollapsibleProps,
	| "open"
	| "motion"
	| "onToggle"
	| "onClosed"
	| "onOpened"
>

export interface TableRowCollapsibleProps extends TableRowProps, PickedCollapsibleProps {
	defaultOpen?: boolean,
	/**
	 * Render your views as collapsible content
	 */
	content?: React.ReactNode,
	contentContainerProps?: Omit<BoxProps, "children">,
	collapsibleProps?: Omit<CollapsibleProps, keyof PickedCollapsibleProps>,
	tableCellChevronProps?: TableCellChevronProps,
	/**
	 * This is shortcut of `tableCellChevronProps.pressableProps.onPress`.
	 * The `tableCellChevronProps.pressableProps.onPress` takes precedence over this prop.
	 */
	onPressChevron?: PressableProps["onPress"],
}
