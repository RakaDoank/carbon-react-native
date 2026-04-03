import {
	forwardRef,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react"

import {
	Pressable,
	type ViewStyle,
} from "react-native"

import type {
	ColorLayerLevel,
} from "@audira/carbon-react-native-elements"

import * as CarbonStyleSheet from "../../carbon-style-sheet"

import {
	LayerContext,
} from "../layer/LayerContext"

import {
	TableCellText,
} from "../table-cell-text/TableCellText"

import {
	TableRowHeaderContext,
} from "../table-row-header/_TableRowHeaderContext"

import type {
	TableCellHeaderProps,
} from "./TableCellHeaderProps"

import type {
	TableCellHeaderRef,
} from "./TableCellHeaderRef"

import {
	SortIcon,
	type SortIconRef,
} from "./_sort-icon"

/**
 * Similar as the `TableCell`. `TableCellHeader` is also a View to render
 * container with a correct horizontal padding, with additional
 * sorting icon option and its coloring.
 * 
 * It's better to use the `TableCell` instead of `TableCellHeader`
 * if a header cell is not using the sorting icon at all to save a bit of memory
 * because `TableCellHeader` has bunch of Pressable logics and two icons loaded.
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
export const TableCellHeader = forwardRef<TableCellHeaderRef, TableCellHeaderProps>(
	function TableCellHeader(
		{
			defaultSort,
			sort: sortProp,
			width,
			children,
			text,
			textProps,
			accessibilityLabel,
			onChangeSort,
			disabled,
			onHoverIn: onHoverInProp,
			onHoverOut: onHoverOutProp,
			onPress: onPressProp,
			style,
			...props
		},
		ref,
	) {

		const
			layerContext =
				useContext(LayerContext),

			tableRowHeaderContext =
				useContext(TableRowHeaderContext),

			sortIconRef =
				useRef<SortIconRef>(null),

			allowOnChangeSortSelfEffect =
				useRef(false),

			[sortSelf, setSortSelf] =
				useState(defaultSort),

			sort =
				sortProp ?? sortSelf,

			[hovered, setHovered] =
				useState(false)

		const
			onHoverIn: NonNullable<typeof onHoverInProp> =
				useCallback(event => {
					if(sortIconRef.current) {
						setHovered(true)
					}

					onHoverInProp?.(event)
				}, [
					onHoverInProp,
				]),

			onHoverOut: NonNullable<typeof onHoverOutProp> =
				useCallback(event => {
					if(sortIconRef.current) {
						setHovered(false)
					}

					onHoverOutProp?.(event)
				}, [
					onHoverOutProp,
				]),

			onPress: NonNullable<typeof onPressProp> =
				useCallback(event => {
					onPressProp?.(event)

					if(defaultSort) {
						allowOnChangeSortSelfEffect.current = true
						setSortSelf(s => {
							if(s == "none") {
								return "asc"
							} else if(s == "asc") {
								return "desc"
							} else {
								return "none"
							}
						})
					} else if(sortProp && onChangeSort) {
						let nextSort: NonNullable<typeof sort> = "none"
						if(sortProp == "none") {
							nextSort = "asc"
						} else if(sortProp == "asc") {
							nextSort = "desc"
						} else {
							nextSort = "none"
						}
						onChangeSort(nextSort)
					}
				}, [
					sortProp,
					defaultSort,
					onChangeSort,
					onPressProp,
				])

		useEffect(() => {
			if(sort) {
				if(sort == "none") {
					if(hovered) {
						sortIconRef.current?.setOpacity(1)
					} else {
						sortIconRef.current?.setOpacity(0)
					}
				} else {
					sortIconRef.current?.setOpacity(1)
				}
			}
		}, [
			hovered,
			sort,
		])

		useEffect(() => {
			if(allowOnChangeSortSelfEffect.current && sort) {
				allowOnChangeSortSelfEffect.current = false
				onChangeSort?.(sort)
			}
		}, [
			sort,
			onChangeSort,
		])

		CarbonStyleSheet.use()

		return (
			<Pressable
				ref={ ref }
				{ ...props }
				accessibilityLabel={ accessibilityLabel || text }
				disabled={ disabled ?? !sort }
				onHoverIn={ onHoverIn }
				onHoverOut={ onHoverOut }
				onPress={ onPress }
				style={ [
					CarbonStyleSheet.g.flex_auto,
					CarbonStyleSheet.g.px_05,

					typeof width === "number" ? {
						width,
					} : undefined,

					hovered || sort === "asc" || sort === "desc"
						? styleSheetBG[`hovered_${layerContext}`]
						: styleSheetBG[`normal_${layerContext}`],

					tableRowHeaderContext.size == "extra_large"
						? CarbonStyleSheet.g.pt_05
						: sort
							? CarbonStyleSheet.g.items_center
							: CarbonStyleSheet.g.justify_center,
					sort
						? [
							CarbonStyleSheet.g.flex_row,
							CarbonStyleSheet.g.justify_between,
						]
						: undefined,
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

				{ !!sort && (
					<SortIcon
						type={ sort }
						ref={ sortIconRef }
					/>
				) }
			</Pressable>
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
				backgroundColor: CarbonStyleSheet.color.layer_accent_03,
			},
			hovered_1: {
				backgroundColor: CarbonStyleSheet.color.layer_accent_hover_01,
			},
			hovered_2: {
				backgroundColor: CarbonStyleSheet.color.layer_accent_hover_02,
			},
			hovered_3: {
				backgroundColor: CarbonStyleSheet.color.layer_accent_hover_03,
			},
		} as const satisfies {
			[Level in `${StateColor}_${ColorLayerLevel}`]: NonNullable<Pick<ViewStyle, "backgroundColor">>
		})

type StateColor =
	| "normal"
	| "hovered"
