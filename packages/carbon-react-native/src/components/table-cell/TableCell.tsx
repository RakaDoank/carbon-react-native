import {
	forwardRef,
	useContext,
} from "react"

import {
	View,
} from "react-native"

import * as CarbonStyleSheet from "../../carbon-style-sheet"

import {
	TableCellText,
} from "../table-cell-text/TableCellText"

import {
	TableRowHeaderContext,
} from "../table-row-header/_TableRowHeaderContext"

import type {
	TableCellProps,
} from "./TableCellProps"

import type {
	TableCellRef,
} from "./TableCellRef"

/**
 * `TableCell` is a pure React Native View to render
 * container with a correct horizontal padding.
 * 
 * To ensure consistent column alignment across rows,
 * you need to provide fixed `width` of the cell.
 * Sets an explicit width for the cell (in pixels) and
 * acts as a column constraint. This helps simulate
 * table-like behavior, since React Native relies on
 * flexbox and does not provide native table layout.
 * Without this, cells in the same column may render
 * with inconsistent widths across different rows.
 */
export const TableCell = forwardRef<TableCellRef, TableCellProps>(
	function TableCell(
		{
			children,
			text,
			textProps,
			width,
			role = "cell",
			accessibilityLabel,
			style,
			...props
		},
		ref,
	) {

		const
			tableRowHeaderContext =
				useContext(TableRowHeaderContext)

		return (
			<View
				ref={ ref }
				{ ...props }
				role={ role }
				accessibilityLabel={ accessibilityLabel || text }
				style={ [
					CarbonStyleSheet.g.flex_auto,
					CarbonStyleSheet.g.px_05,

					tableRowHeaderContext.inRowHeader
						? tableRowHeaderContext.size == "extra_large"
							? CarbonStyleSheet.g.pt_05
							: CarbonStyleSheet.g.self_center
						: undefined,

					typeof width === "number" ? {
						width,
					} : undefined,
					style,
				] }
			>
				{ typeof children === "undefined" && !!text ? (
					<TableCellText
						{ ...textProps }
					>
						{ text }
					</TableCellText>
				) : children }
			</View>
		)

	},
)
