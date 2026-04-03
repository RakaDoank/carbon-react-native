import {
	forwardRef,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react"

import {
	Platform,
	Pressable,
	StyleSheet,
	type PressableProps,
	type ViewStyle,
} from "react-native"

import {
	Motion,
	type ColorLayerLevel,
} from "@audira/carbon-react-native-elements"

import * as CarbonStyleSheet from "../../carbon-style-sheet"

import {
	LayerContext,
} from "../layer"

import {
	TableContext,
} from "../table/_TableContext"

import type {
	TableRowInteractiveState,
} from "./TableRowInteractiveState"

import type {
	TableRowProps,
} from "./TableRowProps"

import type {
	TableRowRef,
} from "./TableRowRef"

import {
	TableRowContext,
} from "./_TableRowContext"

import {
	StyleSheetHeight,
} from "./_style-sheet-height"

export const TableRow = forwardRef<TableRowRef, TableRowProps>(
	function TableRow(
		{
			interactiveState = "normal",
			size: sizeProp,
			zebra,
			onHoverIn: onHoverInProp,
			onHoverOut: onHoverOutProp,
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
				]),

			[hovered, setHovered] =
				useState(false)

		const
			onHoverIn: NonNullable<PressableProps["onHoverIn"]> =
				useCallback(event => {
					setHovered(true)
					onHoverInProp?.(event)
				}, [
					onHoverInProp,
				]),

			onHoverOut: NonNullable<PressableProps["onHoverOut"]> =
				useCallback(event => {
					setHovered(false)
					onHoverOutProp?.(event)
				}, [
					onHoverOutProp,
				])

		return (
			<TableRowContext.Provider
				value={{
					interactiveState,
					hovered,
				}}
			>
				<Pressable
					ref={ ref }
					{ ...props }
					role={ role }
					onHoverIn={ onHoverIn }
					onHoverOut={ onHoverOut }
					style={ [
						styleSheet.tableRow,
						CarbonStyleSheet.g.flex_auto,
						CarbonStyleSheet.g.flex_row,
						StyleSheetHeight[size],
						getInteractiveStateStyle(
							interactiveState,
							{
								layer: layerContext,
								hovered,
								zebra,
							},
						),
						size === "extra_large"
							? CarbonStyleSheet.g.pt_05
							: CarbonStyleSheet.g.items_center,
						style,
					] }
				>
					{ children }
				</Pressable>
			</TableRowContext.Provider>
		)

	},
)

const
	styleSheet =
		StyleSheet.create({
			tableRow: {
				borderBottomWidth: 1,
				borderStyle: "solid",
				...Platform.select({
					web: {
						transitionProperty: "background-color, border-bottom-color",
						transitionDuration: `${Motion.Duration.fast_01}ms`,
						transitionTimingFunction: `cubic-bezier(${Motion.Easing.entrance.productive.x1},${Motion.Easing.entrance.productive.y1},${Motion.Easing.entrance.productive.x2},${Motion.Easing.entrance.productive.y2})`,
					},
				}),
			},
		}),

	styleSheetInteractiveStatePerLayer =
		{
			"1": CarbonStyleSheet.create({
				normal: {
					backgroundColor: CarbonStyleSheet.color.layer_01,
					borderBottomColor: CarbonStyleSheet.color.border_subtle_01,
				},
				hovered: {
					backgroundColor: CarbonStyleSheet.color.layer_hover_01,
					borderBottomColor: CarbonStyleSheet.color.border_subtle_01,
				},
				disabled: {
					backgroundColor: CarbonStyleSheet.color.layer_01,
					borderBottomColor: CarbonStyleSheet.color.border_subtle_01,
				},
				selected: {
					backgroundColor: CarbonStyleSheet.color.layer_selected_01,
					borderBottomColor: CarbonStyleSheet.color.border_subtle_selected_01,
				},
				selected_hover: {
					backgroundColor: CarbonStyleSheet.color.layer_selected_hover_01,
					borderBottomColor: CarbonStyleSheet.color.border_subtle_selected_01,
				},
				zebra: {
					backgroundColor: CarbonStyleSheet.color.layer_accent_01,
					borderBottomColor: CarbonStyleSheet.color.layer_accent_01,
				},
			}),
			"2": CarbonStyleSheet.create({
				normal: {
					backgroundColor: CarbonStyleSheet.color.layer_02,
					borderBottomColor: CarbonStyleSheet.color.border_subtle_02,
				},
				hovered: {
					backgroundColor: CarbonStyleSheet.color.layer_hover_02,
					borderBottomColor: CarbonStyleSheet.color.border_subtle_02,
				},
				disabled: {
					backgroundColor: CarbonStyleSheet.color.layer_02,
					borderBottomColor: CarbonStyleSheet.color.border_subtle_02,
				},
				selected: {
					backgroundColor: CarbonStyleSheet.color.layer_selected_02,
					borderBottomColor: CarbonStyleSheet.color.border_subtle_selected_02,
				},
				selected_hover: {
					backgroundColor: CarbonStyleSheet.color.layer_selected_hover_02,
					borderBottomColor: CarbonStyleSheet.color.border_subtle_selected_02,
				},
				zebra: {
					backgroundColor: CarbonStyleSheet.color.layer_accent_02,
					borderBottomColor: CarbonStyleSheet.color.layer_accent_02,
				},
			}),
			"3": CarbonStyleSheet.create({
				normal: {
					backgroundColor: CarbonStyleSheet.color.layer_03,
					borderBottomColor: CarbonStyleSheet.color.border_subtle_03,
				},
				hovered: {
					backgroundColor: CarbonStyleSheet.color.layer_hover_03,
					borderBottomColor: CarbonStyleSheet.color.border_subtle_03,
				},
				disabled: {
					backgroundColor: CarbonStyleSheet.color.layer_03,
					borderBottomColor: CarbonStyleSheet.color.border_subtle_03,
				},
				selected: {
					backgroundColor: CarbonStyleSheet.color.layer_selected_03,
					borderBottomColor: CarbonStyleSheet.color.border_subtle_selected_03,
				},
				selected_hover: {
					backgroundColor: CarbonStyleSheet.color.layer_selected_hover_03,
					borderBottomColor: CarbonStyleSheet.color.border_subtle_selected_03,
				},
				zebra: {
					backgroundColor: CarbonStyleSheet.color.layer_accent_03,
					borderBottomColor: CarbonStyleSheet.color.layer_accent_03,
				},
			}),
		} as const satisfies {
			[Layer in ColorLayerLevel]: Record<
				| TableRowInteractiveState
				| "hovered"
				| "selected_hover"
				| "zebra",
				ViewStyle
			>
		}

function getInteractiveStateStyle(
	interactiveState: TableRowInteractiveState,
	data: {
		layer: ColorLayerLevel,
		hovered: boolean,
		zebra?: boolean,
	},
) {
	if(!data.hovered) {
		if(data.zebra && interactiveState == "normal") {
			return styleSheetInteractiveStatePerLayer[data.layer].zebra
		}
		return styleSheetInteractiveStatePerLayer[data.layer][interactiveState]
	}

	if(interactiveState == "selected") {
		return styleSheetInteractiveStatePerLayer[data.layer].selected_hover
	}

	return styleSheetInteractiveStatePerLayer[data.layer].hovered
}
