import {
	forwardRef,
	useContext,
} from "react"

import type {
	TextStyle,
} from "react-native"

import * as CarbonStyleSheet from "../../carbon-style-sheet"

import {
	TableRowContext,
} from "../table-row/_TableRowContext"

import {
	TableRowHeaderContext,
} from "../table-row-header/_TableRowHeaderContext"

import {
	Text,
} from "../text"

import type {
	TableCellTextProps,
} from "./TableCellTextProps"

import type {
	TableCellTextRef,
} from "./TableCellTextRef"

/**
 * `TableCellText` is a `Text` component as wrapper to get correct text color style based by row's interactive state, including hovering the row
 */
export const TableCellText = forwardRef<TableCellTextRef, TableCellTextProps>(
	function TableCellText(
		{
			children,
			style,
			...props
		},
		ref,
	) {

		CarbonStyleSheet.use()

		const
			tableRowContext =
				useContext(TableRowContext),

			tableRowHeaderContext =
				useContext(TableRowHeaderContext)

		return (
			<Text
				ref={ ref }
				{ ...props }
				type={ tableRowHeaderContext.inRowHeader ? "heading_compact_01" : "body_compact_01" }
				style={ [
					getStyleSheetInteractiveState({
						rowInteractiveState: tableRowContext.interactiveState,
						rowHovered: tableRowContext.hovered,
						inRowHeader: tableRowHeaderContext.inRowHeader,
					}),
					style,
				] }
			>
				{ children }
			</Text>
		)

	},
)

const
	styleSheetInteractiveState =
		CarbonStyleSheet.create({
			normal: {
				color: CarbonStyleSheet.color.text_secondary,
			},
			disabled: {
				color: CarbonStyleSheet.color.text_disabled,
			},
			selected: {
				color: CarbonStyleSheet.color.text_primary,
			},
			normal_header: {
				color: CarbonStyleSheet.color.text_primary,
			},
		} as const satisfies Record<
			| TableRowContext["interactiveState"]
			| "normal_header",
			TextStyle
		>)

function getStyleSheetInteractiveState(
	data: {
		rowInteractiveState: TableRowContext["interactiveState"],
		rowHovered: boolean,
		inRowHeader: boolean,
	},
) {
	if(!data.inRowHeader) {
		if(data.rowHovered) {
			return styleSheetInteractiveState.selected // same style as the `selected`
		}
		return styleSheetInteractiveState[data.rowInteractiveState]
	}

	return styleSheetInteractiveState.normal_header
}
