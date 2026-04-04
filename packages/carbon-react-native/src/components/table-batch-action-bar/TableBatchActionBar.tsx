import {
	forwardRef,
	useContext,
} from "react"

import {
	StyleSheet,
	type ViewStyle,
} from "react-native"

import * as CarbonStyleSheet from "../../carbon-style-sheet"

import {
	Box,
} from "../box/Box"

import {
	ScrollView,
} from "../scroll-view/ScrollView"

import {
	TableContext,
} from "../table/_TableContext"

import {
	Text,
} from "../text/Text"

import type {
	TableBatchActionBarProps,
} from "./TableBatchActionBarProps"

import type {
	TableBatchActionBarRef,
} from "./TableBatchActionBarRef"

import type {
	TableBatchActionBarSize,
} from "./TableBatchActionBarSize"

import {
	TableBatchActionBarContext,
} from "./_TableBatchActionBarContext"

export const TableBatchActionBar = forwardRef<TableBatchActionBarRef, TableBatchActionBarProps>(
	function TableBatchActionBar(
		{
			size: sizeProp,
			horizontal = true,
			text,
			textProps,
			buttons,
			style,
			contentContainerStyle,
			...props
		},
		ref,
	) {

		const
			tableContext =
				useContext(TableContext),

			size =
				sizeProp ?? tableContext.rowSize,

			batchActionBarSize =
				mapRowSizeToBatchActionBarSize[size]

		return (
			<TableBatchActionBarContext.Provider
				value={{
					size: batchActionBarSize,
				}}
			>
				<ScrollView
					ref={ ref }
					{ ...props }
					horizontal={ horizontal }
					style={ [
						carbonStyleSheet.tableBatchActionBar,
						// if users provide size prop manually
						// they will still get the correct size style
						// the `large` and `small` from `TableBatchActionBarSize`
						// are also used by `TableRowSize`
						styleSheetSize[batchActionBarSize],
						style,
					] }
					contentContainerStyle={ [
						CarbonStyleSheet.g.flex_auto,
						CarbonStyleSheet.g.flex_row,
						CarbonStyleSheet.g.justify_between,
						contentContainerStyle,
					] }
				>
					<Text
						{ ...textProps }
						type="body_compact_01"
						style={ [
							CarbonStyleSheet.g.flex_auto,
							CarbonStyleSheet.g.self_center,
							CarbonStyleSheet.g.px_05,
							carbonStyleSheet.text,
							textProps?.style,
						] }
					>
						{ text }
					</Text>

					{ !!buttons && (
						<Box
							style={ [
								CarbonStyleSheet.g.flex_row,
								CarbonStyleSheet.g.self_stretch,
							] }
						>
							{ buttons }
						</Box>
					) }
				</ScrollView>
			</TableBatchActionBarContext.Provider>
		)

	},
)

const
	styleSheetSize =
		StyleSheet.create({
			small: {
				height: 32,
			},
			large: {
				height: 48,
			},
		} as const satisfies Record<TableBatchActionBarSize, NonNullable<Pick<ViewStyle, "height">>>),

	mapRowSizeToBatchActionBarSize =
		{
			extra_small: "small",
			small: "small",
			medium: "small",
			large: "large",
			extra_large: "large",
		} as const satisfies Record<TableContext["rowSize"], TableBatchActionBarSize>,

	carbonStyleSheet =
		CarbonStyleSheet.create({
			tableBatchActionBar: {
				backgroundColor: CarbonStyleSheet.color.background_brand,
			},
			text: {
				textWrap: "nowrap",
				color: CarbonStyleSheet.color.text_on_color,
			},
		})
