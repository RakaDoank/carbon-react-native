import {
	forwardRef,
	useContext,
} from "react"

import type {
	TextStyle,
	ViewStyle,
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
	Text,
} from "../text/Text"

import type {
	TableHeaderProps,
} from "./TableHeaderProps"

import type {
	TableHeaderRef,
} from "./TableHeaderRef"

export const TableHeader = forwardRef<TableHeaderRef, TableHeaderProps>(
	function TableHeader(
		{
			title,
			description,
			titleProps,
			descriptionProps,
			style,
			...props
		},
		ref,
	) {

		const
			layerContext =
				useContext(LayerContext)

		return (
			<Box
				ref={ ref }
				{ ...props }
				style={ [
					CarbonStyleSheet.g.pt_05,
					CarbonStyleSheet.g.pb_06,
					CarbonStyleSheet.g.px_05,
					carbonStyleSheet[`bg_${layerContext}`],
					style,
				] }
			>
				<Text
					{ ...titleProps }
					type="heading_03"
				>
					{ title }
				</Text>

				{ !!description && (
					<Text
						{ ...descriptionProps }
						type="body_compact_01"
						style={ [
							carbonStyleSheet.description,
							descriptionProps?.style,
						] }
					>
						{ description }
					</Text>
				) }
			</Box>
		)

	},
)

const
	carbonStyleSheet =
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
			description: {
				color: CarbonStyleSheet.color.text_secondary,
			},
		} as const satisfies {
			[Layer in `bg_${ColorLayerLevel}`]: Pick<ViewStyle, "backgroundColor">
		} & {
			description: Pick<TextStyle, "color">,
		})
