import {
	useContext,
} from 'react'

import {
	StyleSheet,
	View,
	type ViewProps,
} from 'react-native'

import {
	Spacing,
} from '@audira/carbon-react-native-elements'

import {
	ThemeContext,
} from '../../contexts'

import {
	CommonStyle,
} from '../../styles'

export interface HeaderBorderProps {
	/**
	 * https://carbondesignsystem.com/components/accordion/style/#flush-alignment
	 */
	flushAlignment?: boolean,
	style?: ViewProps['style'],
}

export function HeaderBorder({
	flushAlignment,
	style: styleProp,
}: HeaderBorderProps) {

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
						left: Spacing.spacing_05,
						right: Spacing.spacing_05,
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
