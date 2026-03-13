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

import * as CarbonStyleSheet from "../../carbon-style-sheet"

import {
	ThemeContext,
} from "../../contexts"

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
				CarbonStyleSheet.g.absolute,
				style.borderBox,
				carbonStyle.borderBox,
				flushAlignment
					? {
						left: Spacing.spacing_05,
						right: Spacing.spacing_05,
					}
					: CarbonStyleSheet.g.w_full,
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
