import {
	forwardRef,
	useContext,
	useMemo,
} from "react"

import type {
	ViewStyle,
} from "react-native"

import type {
	ColorLayerLevel,
} from "@audira/carbon-react-native-elements"

import * as CarbonStyleSheet from "../../carbon-style-sheet"

import {
	Box,
} from "../box"

import {
	LayerContext,
} from "../layer"

import {
	TableContext,
} from "../table/_TableContext"

import {
	StyleSheetHeight,
} from "../table-row/_style-sheet-height"

import type {
	TableRowHeaderProps,
} from "./TableRowHeaderProps"

import type {
	TableRowHeaderRef,
} from "./TableRowHeaderRef"

import {
	TableRowHeaderContext,
} from "./_TableRowHeaderContext"

export const TableRowHeader = forwardRef<TableRowHeaderRef, TableRowHeaderProps>(
	function TableRowHeader(
		{
			size: sizeProp,
			role = "row",
			style,
			children,
			...props
		},
		ref,
	) {

		CarbonStyleSheet.use()

		const
			layerContext =
				useContext(LayerContext),

			tableContext =
				useContext(TableContext),

			size =
				useMemo(() => {
					return sizeProp ?? tableContext.rowSize
				}, [
					sizeProp,
					tableContext.rowSize,
				])

		return (
			<TableRowHeaderContext.Provider
				value={{
					inRowHeader: true,
					size,
				}}
			>
				<Box
					ref={ ref }
					{ ...props }
					role={ role }
					style={ [
						CarbonStyleSheet.g.flex_auto,
						CarbonStyleSheet.g.flex_row,
						StyleSheetHeight[size],
						styleSheetBG[`normal_${layerContext}`],
						style,
					] }
				>
					{ children }
				</Box>
			</TableRowHeaderContext.Provider>
		)

	},
)

const
	styleSheetBG =
		CarbonStyleSheet.create({
			normal_1: {
				backgroundColor: CarbonStyleSheet.color.layer_accent_01,
			},
			normal_2: {
				backgroundColor: CarbonStyleSheet.color.layer_accent_02,
			},
			normal_3: {
				backgroundColor: CarbonStyleSheet.color.layer_accent_02,
			},
		} as const satisfies {
			[Layer in `${"normal"}_${ColorLayerLevel}`]: Pick<ViewStyle, "backgroundColor">
		})
