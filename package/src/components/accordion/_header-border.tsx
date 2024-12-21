import {
	useContext,
} from 'react'

import {
	StyleSheet,
	View,
	type ViewProps,
} from 'react-native'

import {
	SpacingConstant,
} from '../../constants'

import {
	ThemeContext,
} from '../../contexts'

import {
	CommonStyle,
} from '../../styles'

export interface AccordionHeaderBorderProps {
	/**
	 * https://carbondesignsystem.com/components/accordion/style/#flush-alignment
	 */
	flushAlignment?: boolean,
	style?: ViewProps['style'],
}

export function AccordionHeaderBorder({
	flushAlignment,
	style: styleProp,
}: AccordionHeaderBorderProps) {

	const
		themeContext =
			useContext(ThemeContext)

	return (
		<View
			style={ [
				CommonStyle.absolute,
				style.borderBox,
				{
					borderColor: themeContext.color.border_subtle_00,
				},
				flushAlignment
					? {
						left: SpacingConstant.spacing_05,
						right: SpacingConstant.spacing_05,
					}
					: CommonStyle.w_full,
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
		})
