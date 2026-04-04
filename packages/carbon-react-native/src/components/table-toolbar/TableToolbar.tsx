import {
	forwardRef,
	useContext,
} from "react"

import {
	StyleSheet,
	type ViewStyle,
} from "react-native"

import type {
	ColorLayerLevel,
} from "@audira/carbon-react-native-elements"

import * as CarbonStyleSheet from "../../carbon-style-sheet"

import {
	Box,
} from "../box/Box"

import {
	LayerContext,
} from "../layer/LayerContext"

import {
	ScrollView,
} from "../scroll-view/ScrollView"

import {
	TableContext,
} from "../table/_TableContext"

import type {
	TableToolbarProps,
} from "./TableToolbarProps"

import type {
	TableToolbarRef,
} from "./TableToolbarRef"

import type {
	TableToolbarSize,
} from "./TableToolbarSize"

import {
	TableToolbarContext,
} from "./_TableToolbarContext"

export const TableToolbar = forwardRef<TableToolbarRef, TableToolbarProps>(
	function TableToolbar(
		{
			size: sizeProp,
			buttons,
			children,
			horizontal = true,
			role = "group",
			"aria-label": ariaLabel = "table toolbar",
			style,
			contentContainerStyle,
			...props
		},
		ref,
	) {

		const
			layerContext =
				useContext(LayerContext),

			tableContext =
				useContext(TableContext),

			size =
				sizeProp ?? tableContext.rowSize

		return (
			<TableToolbarContext.Provider
				value={{
					size: sizeProp ?? mapRowSizeToToolbarSize[tableContext.rowSize],
				}}
			>
				<ScrollView
					ref={ ref }
					{ ...props }
					role={ role }
					aria-label={ ariaLabel }
					horizontal={ horizontal }
					style={ [
						// if users provide size prop manually
						// they will still get the correct size style
						// the `large` and `small` from `TableToolbarSize`
						// are also used by `TableRowSize`
						styleSheetSize[
							mapRowSizeToToolbarSize[size]
						],

						styleSheetBGPerLayer[`bg_${layerContext}`],

						style,
					] }
					contentContainerStyle={ [
						CarbonStyleSheet.g.flex_row,
						CarbonStyleSheet.g.flex_auto,
						CarbonStyleSheet.g.justify_between,
						contentContainerStyle,
					] }
				>
					<Box
						style={ [
							CarbonStyleSheet.g.flex_auto,
						] }
					>
						{ children }
					</Box>

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
			</TableToolbarContext.Provider>
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
		} as const satisfies Record<TableToolbarSize, NonNullable<Pick<ViewStyle, "height">>>),

	mapRowSizeToToolbarSize =
		{
			extra_small: "small",
			small: "small",
			medium: "small",
			large: "large",
			extra_large: "large",
		} as const satisfies Record<TableContext["rowSize"], TableToolbarSize>,

	styleSheetBGPerLayer =
		CarbonStyleSheet.create({
			bg_1: {
				backgroundColor: CarbonStyleSheet.color.layer_01,
			},
			bg_2: {
				backgroundColor: CarbonStyleSheet.color.layer_02,
			},
			bg_3: {
				backgroundColor: CarbonStyleSheet.color.layer_03,
			},
		} as const satisfies {
			[Name in `bg_${ColorLayerLevel}`]: NonNullable<Pick<ViewStyle, "backgroundColor">>
		})
