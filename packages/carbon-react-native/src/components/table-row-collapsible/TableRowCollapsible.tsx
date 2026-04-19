import {
	forwardRef,
	useCallback,
	useContext,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from "react"

import {
	StyleSheet,
	View,
	type PressableProps,
	type ViewProps,
	type ViewStyle,
} from "react-native"

import type {
	ColorLayerLevel,
} from "@audira/carbon-react-native-elements"

import * as CarbonStyleSheet from "../../carbon-style-sheet"

import {
	Box,
} from "../box"

import {
	Collapsible,
	type CollapsibleProps,
} from "../collapsible"

import {
	LayerContext,
} from "../layer"

import {
	TableContext,
} from "../table/_TableContext"

import {
	TableCell,
} from "../table-cell"

import {
	TableRow,
	type TableRowInteractiveState,
	type TableRowRef,
} from "../table-row"

import {
	TableRowContext,
} from "../table-row/_TableRowContext"

import {
	StyleSheetHeight as TableRowStyleSheetHeight,
} from "../table-row/_style-sheet-height"

import type {
	TableRowCollapsibleProps,
} from "./TableRowCollapsibleProps"

import type {
	TableRowCollapsibleRef,
} from "./TableRowCollapsibleRef"

import type {
	TableRowCollapsibleRefBase,
} from "./TableRowCollapsibleRefBase"

import {
	TableCellChevron,
} from "./_table-cell-chevron"

export const TableRowCollapsible = forwardRef<TableRowCollapsibleRef, TableRowCollapsibleProps>(
	function TableRowCollapsible(
		{
			// +++ Picked CollapsibleProps +++
			defaultOpen,
			open: openProp,
			motion,
			onToggle,
			onOpened,
			onClosed,
			// --- Picked CollapsibleProps ---
			size: sizeProp,
			content,
			contentContainerProps,
			collapsibleProps,
			tableCellChevronProps,
			onPressChevron,
			children,
			style,
			...props
		},
		ref,
	) {

		const
			tableContext =
				useContext(TableContext),

			tableRowRef =
				useRef<TableRowRef>(null),

			size =
				useMemo(() => {
					return sizeProp ?? tableContext.rowSize
				}, [
					sizeProp,
					tableContext.rowSize,
				]),

			[openSelf, setOpenSelf] =
				useState(!!defaultOpen),

			controlled =
				typeof openProp !== "undefined",

			open =
				controlled ? !!openProp : openSelf,

			[expanded, setExpanded] =
				useState(!!open)

		const
			onPress: PressableProps["onPress"] =
				useCallback(event => {
					if(tableCellChevronProps?.pressableProps?.onPress) {
						tableCellChevronProps.pressableProps.onPress(event)
					} else if(onPressChevron) {
						onPressChevron(event)
					}

					if(!controlled) {
						setOpenSelf(s => !s)
					}
				}, [
					tableCellChevronProps?.pressableProps,
					onPressChevron,
					controlled,
				]),

			onClosedHandler: NonNullable<CollapsibleProps["onClosed"]> =
				useCallback(() => {
					onClosed?.()
					setExpanded(false)
				}, [
					onClosed,
				])

		useImperativeHandle(ref, () => {
			return Object.assign<TableRowRef, TableRowCollapsibleRefBase>(
				tableRowRef.current ?? {} as TableRowRef,
				{
					get open() {
						return open
					},
					setOpen(value) {
						if(!controlled) {
							setOpenSelf(value)
						}
					},
				},
			)
		}, [
			open,
			controlled,
		])

		useEffect(() => {
			if(open) {
				setExpanded(true)
			}
		}, [
			open,
		])

		return (
			<TableRow
				ref={ tableRowRef }
				{ ...props }
				style={ [
					CarbonStyleSheet.g.flex_col, // override the row flex direction since TableRow is not directly the parent of children
					CarbonStyleSheet.g.items_stretch,
					expanded
						? CarbonStyleSheet.g.h_auto
						: undefined,
					styleSheet.tableRowCollapsible,
					style,
				] }
			>
				<Box
					style={ [
						CarbonStyleSheet.g.flex_auto,
						CarbonStyleSheet.g.flex_row,
						size === "extra_large"
							? CarbonStyleSheet.g.pt_05
							: CarbonStyleSheet.g.items_center,
						expanded ? TableRowStyleSheetHeight[size] : undefined,
					] }
				>
					<TableCellChevron
						{ ...tableCellChevronProps }
						open={ open }
						invisible={ !content }
						pressableProps={{
							...tableCellChevronProps?.pressableProps,
							onPress,
						}}
					/>

					{ children }
				</Box>

				{ !!content && (
					<Collapsible
						{ ...collapsibleProps }
						role={ collapsibleProps?.role ?? "table" }
						open={ open }
						motion={ motion }
						onToggle={ onToggle }
						onOpened={ onOpened }
						onClosed={ onClosedHandler }
						contentContainerProps={{
							...contentContainerProps,
							role: contentContainerProps?.role ?? "row",
							style: [
								CarbonStyleSheet.g.flex_auto,
								CarbonStyleSheet.g.flex_row,
								CarbonStyleSheet.g.items_stretch,
								TableRowStyleSheetHeight[size],
								size === "extra_large"
									? CarbonStyleSheet.g.pt_05
									: CarbonStyleSheet.g.items_center,
								collapsibleProps?.contentContainerProps?.style,
							],
						}}
					>
						<ContentContainerBorder
							style={ [
								CarbonStyleSheet.g.absolute,
								styleSheet.contentContainerBorder,
								{
									left: tableCellChevronProps?.width ?? (36 + 16),
								},
							] }
						/>

						{ /* empty cell */ }
						<TableCell
							width={ tableCellChevronProps?.width ?? 36 }
							style={ [
								CarbonStyleSheet.g.flex_initial,
							] }
						/>

						{/* <Box
							{ ...contentContainerProps }
							style={ [
								CarbonStyleSheet.g.pe_05,
								CarbonStyleSheet.g.flex_auto,
								size === "extra_large"
									? CarbonStyleSheet.g.pt_05
									: CarbonStyleSheet.g.justify_center,
								styleSheet.contentContainer,
								contentContainerBorderStyleSheet[layerContext][interactiveState],
								contentContainerProps?.style,
							] }
						> */}
						{ content }
						{/* </Box> */}
					</Collapsible>
				) }
			</TableRow>
		)

	},
)

interface ContentContainerBorderProps extends Omit<ViewProps, "children"> {
}

function ContentContainerBorder({
	style,
	...props
}: ContentContainerBorderProps) {

	const
		layerContext =
			useContext(LayerContext),

		tableRowContext =
			useContext(TableRowContext)

	return (
		<View
			{ ...props }
			style={ [
				getContentContainerBorderStyleSheet(
					tableRowContext.interactiveState,
					{
						layer: layerContext,
						hovered: tableRowContext.hovered,
						selected: tableRowContext.selected,
					},
				),
				style,
			] }
		/>
	)

}

const
	styleSheet =
		StyleSheet.create({
			tableRowCollapsible: {
				paddingTop: 0,
			},
			contentContainerBorder: {
				height: 1,
				top: 0,
				right: 0,
			},
			contentContainer: {
				borderTopWidth: 1,
				borderStyle: "solid",
			},
		}),

	contentContainerBorderStyleSheet =
		{
			"1": CarbonStyleSheet.create({
				normal: {
					backgroundColor: CarbonStyleSheet.color.border_subtle_01,
				},
				hovered: {
					backgroundColor: CarbonStyleSheet.color.border_subtle_01,
				},
				disabled: {
					backgroundColor: CarbonStyleSheet.color.border_subtle_01,
				},
				selected: {
					backgroundColor: CarbonStyleSheet.color.border_subtle_selected_01,
				},
				zebra: {
					backgroundColor: CarbonStyleSheet.color.layer_accent_01,
				},
			}),
			"2": CarbonStyleSheet.create({
				normal: {
					backgroundColor: CarbonStyleSheet.color.border_subtle_02,
				},
				hovered: {
					backgroundColor: CarbonStyleSheet.color.border_subtle_02,
				},
				disabled: {
					backgroundColor: CarbonStyleSheet.color.border_subtle_02,
				},
				selected: {
					backgroundColor: CarbonStyleSheet.color.border_subtle_selected_02,
				},
				zebra: {
					backgroundColor: CarbonStyleSheet.color.layer_accent_02,
				},
			}),
			"3": CarbonStyleSheet.create({
				normal: {
					backgroundColor: CarbonStyleSheet.color.border_subtle_03,
				},
				hovered: {
					backgroundColor: CarbonStyleSheet.color.border_subtle_03,
				},
				disabled: {
					backgroundColor: CarbonStyleSheet.color.border_subtle_03,
				},
				selected: {
					backgroundColor: CarbonStyleSheet.color.border_subtle_selected_03,
				},
				zebra: {
					backgroundColor: CarbonStyleSheet.color.layer_accent_03,
				},
			}),
		} as const satisfies {
			[Layer in ColorLayerLevel]: Record<
				| TableRowInteractiveState
				| "hovered"
				| "selected"
				| "zebra",
				ViewStyle
			>
		}

function getContentContainerBorderStyleSheet(
	interactiveState: TableRowInteractiveState,
	modifier: {
		layer: ColorLayerLevel,
		selected: boolean,
		hovered: boolean,
		zebra?: boolean,
	},
) {
	if(modifier.selected || modifier.hovered) {
		return contentContainerBorderStyleSheet[modifier.layer].selected
	}

	if(modifier.zebra) {
		return contentContainerBorderStyleSheet[modifier.layer].zebra
	}

	return contentContainerBorderStyleSheet[modifier.layer][interactiveState]
}
