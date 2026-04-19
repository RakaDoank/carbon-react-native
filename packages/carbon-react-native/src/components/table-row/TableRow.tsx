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
	type View,
	type ViewProps,
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
	TableRowContextProvider,
} from "./_TableRowContextProvider"

import {
	StyleSheetHeight,
} from "./_style-sheet-height"

export const TableRow = forwardRef<TableRowRef, TableRowProps>(
	function TableRow(
		{
			interactiveState = "normal",
			size,
			zebra,
			defaultSelected,
			onHoverIn: onHoverInProp,
			onHoverOut: onHoverOutProp,
			role = "row",
			...props
		},
		ref,
	) {

		const
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
			<TableRowContextProvider
				interactiveState={ interactiveState }
				hovered={ hovered }
				defaultSelected={ defaultSelected }
			>
				<Content
					ref={ ref }
					{ ...props }
					interactiveState={ interactiveState }
					size={ size }
					zebra={ zebra }
					role={ role }
					onHoverIn={ onHoverIn }
					onHoverOut={ onHoverOut }
				/>
			</TableRowContextProvider>
		)

	},
)

interface ContentProps extends Omit<PressableProps, "style"> {
	interactiveState: NonNullable<TableRowProps["interactiveState"]>,
	size?: TableRowProps["size"],
	zebra?: TableRowProps["zebra"],
	style?: ViewProps["style"],
}

const Content = forwardRef<View, ContentProps>(
	function Content(
		{
			interactiveState,
			size: sizeProp,
			zebra,
			style,
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

			tableRowContext =
				useContext(TableRowContext)

		return (
			<Pressable
				ref={ ref }
				{ ...props }
				style={ [
					styleSheet.tableRow,
					CarbonStyleSheet.g.flex_auto,
					CarbonStyleSheet.g.flex_row,
					StyleSheetHeight[size],
					getInteractiveStateStyle(
						interactiveState,
						{
							layer: layerContext,
							hovered: tableRowContext.hovered,
							selected: tableRowContext.selected,
							zebra,
						},
					),
					size === "extra_large"
						? CarbonStyleSheet.g.pt_05
						: CarbonStyleSheet.g.items_center,
					style,
				] }
			/>
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
						cursor: "auto",
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
				| "selected"
				| "selected_hover"
				| "zebra",
				ViewStyle
			>
		}

function getInteractiveStateStyle(
	interactiveState: TableRowInteractiveState,
	modifier: {
		layer: ColorLayerLevel,
		selected: boolean,
		hovered: boolean,
		zebra?: boolean,
	},
) {
	if(!modifier.hovered) {
		if(modifier.zebra && interactiveState == "normal") {
			return styleSheetInteractiveStatePerLayer[modifier.layer].zebra
		}
		if(modifier.selected) {
			return styleSheetInteractiveStatePerLayer[modifier.layer].selected
		}
		return styleSheetInteractiveStatePerLayer[modifier.layer][interactiveState]
	}

	if(modifier.selected) {
		return styleSheetInteractiveStatePerLayer[modifier.layer].selected_hover
	}

	return styleSheetInteractiveStatePerLayer[modifier.layer].hovered
}
