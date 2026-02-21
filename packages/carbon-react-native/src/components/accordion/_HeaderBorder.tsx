import {
	useContext,
} from "react"

import {
	StyleSheet,
	View,
	type ViewProps,
} from "react-native"

import {
	Spacing,
} from "@audira/carbon-react-native-elements"

import {
	CarbonStyleSheet,
} from "../../carbon-style-sheet"

import {
	ThemeContext,
} from "../../contexts"

import {
	PositionStyleSheet,
	WidthStyleSheet,
} from "../../style-sheets"

export interface HeaderBorderProps {
	/**
	 * https://carbondesignsystem.com/components/accordion/style/#flush-alignment
	 */
	flushAlignment?: boolean,
	style?: ViewProps["style"],
}

export function HeaderBorder({
	flushAlignment,
	style: styleProp,
}: HeaderBorderProps) {

	useContext(ThemeContext)

	return (
		<View
			style={ [
				PositionStyleSheet.absolute,
				style.borderBox,
				carbonStyle.borderBox,
				flushAlignment
					? {
						left: Spacing.spacing_05,
						right: Spacing.spacing_05,
					}
					: WidthStyleSheet.w_full,
				styleProp,
			] }
		/>
	)

}

const
	style =
		StyleSheet.create({
			borderBox: {
				height: 1,
				borderTopWidth: 1,
			},
		}),

	carbonStyle =
		CarbonStyleSheet.create({
			borderBox: {
				borderColor: CarbonStyleSheet.color.border_subtle_00,
			},
		})
