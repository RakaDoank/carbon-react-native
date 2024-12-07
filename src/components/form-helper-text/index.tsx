import {
	useContext,
} from 'react'

import {
	StyleSheet,
	View,
	type ViewProps,
} from 'react-native'

import {
	ThemeContext,
} from '../../contexts'

import {
	FlexStyle,
} from '../../styles'

import {
	Text,
	type TextProps,
} from '../text'

export interface FormHelperTextProps extends Omit<ViewProps, 'children'> {
	error?: boolean,
	text: string,
	textLeading?: React.ReactNode,
	textTrailing?: React.ReactNode,
	textProps?: Omit<TextProps, 'children'>,
}

export function FormHelperText({
	error,
	text,
	textLeading,
	textTrailing,
	textProps,
	style,
	...props
}: FormHelperTextProps) {

	const
		themeContext =
			useContext(ThemeContext)

	return (
		<View
			{ ...props }
			style={ [
				FlexStyle.flex_initial,
				FlexStyle.flex_row,
				baseStyle.container,
				style,
			] }
		>
			{ textLeading }

			<Text
				{ ...textProps }
				type={ textProps?.type || 'helper_text_01' }
				style={ [
					{
						color: error
							? themeContext.color.text_error
							: themeContext.color.text_primary,
					},
					textProps?.style,
				] }
			>
				{ text }
			</Text>

			{ textTrailing }
		</View>
	)

}

const
	baseStyle =
		StyleSheet.create({
			container: {
				gap: 8,
			},
		})
