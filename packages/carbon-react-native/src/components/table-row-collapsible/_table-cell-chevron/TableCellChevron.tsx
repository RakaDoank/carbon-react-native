import {
	useContext,
} from "react"

import {
	Pressable,
	StyleSheet,
} from "react-native"

import {
	Color,
} from "@audira/carbon-react-native-elements"

import {
	AnimatedCollapsibleChevron,
} from "../../../_internal/components"

import * as CarbonStyleSheet from "../../../carbon-style-sheet"

import {
	ThemeContext,
} from "../../../contexts"

import type {
	ThemeType,
} from "../../../types"

import {
	TableCell,
} from "../../table-cell"

import {
	TableRowContext,
} from "../../table-row/_TableRowContext"

import type {
	TableCellChevronProps,
} from "./TableCellChevronProps"

export function TableCellChevron({
	width = 36,
	open,
	invisible,
	pressableProps,
	style,
	...props
}: TableCellChevronProps) {

	const
		themeContext =
			useContext(ThemeContext),

		tableRowContext =
			useContext(TableRowContext)

	return (
		<TableCell
			{ ...props }
			width={ width }
			style={ [
				styleSheet.tableCellChevron,
				invisible ? styleSheet.tableCellChevronInvisible : undefined,
				CarbonStyleSheet.g.flex_initial,
				style,
			] }
		>
			<Pressable
				{ ...pressableProps }
				style={ [
					styleSheet.pressable,
					CarbonStyleSheet.g.ms_03,
					CarbonStyleSheet.g.items_center,
				] }
			>
				{ !invisible && (
					<AnimatedCollapsibleChevron
						color={ resolveIconColor(
							tableRowContext.interactiveState,
							{
								colorScheme: themeContext.colorScheme,
								hovered: tableRowContext.hovered,
								selected: tableRowContext.selected,
							},
						) }
						open={ open }
						size={ 16 }
					/>
				) }
			</Pressable>
		</TableCell>
	)

}

const
	styleSheet =
		StyleSheet.create({
			tableCellChevron: {
				paddingHorizontal: 0,
			},
			tableCellChevronInvisible: {
				opacity: 0,
			},
			pressable: {
				width: 32,
			},
		}),

	mapIconColor =
		{
			normal: {
				gray_10: Color.Token.gray_10.icon_secondary,
				gray_100: Color.Token.gray_100.icon_secondary,
			},
			disabled: {
				gray_10: Color.Token.gray_10.icon_disabled,
				gray_100: Color.Token.gray_100.icon_disabled,
			},
			selected: {
				gray_10: Color.Token.gray_10.icon_primary,
				gray_100: Color.Token.gray_100.icon_primary,
			},
		} as const satisfies Record<
			TableRowContext["interactiveState"] | "selected",
			Record<ThemeType.ColorScheme, string>
		>

function resolveIconColor(
	interactiveState: TableRowContext["interactiveState"],
	modifier: {
		colorScheme: ThemeContext["colorScheme"],
		hovered: boolean,
		selected: boolean,
	},
) {
	if(modifier.hovered || modifier.selected) {
		return mapIconColor.selected[modifier.colorScheme]
	}
	return mapIconColor[interactiveState][modifier.colorScheme]
}
