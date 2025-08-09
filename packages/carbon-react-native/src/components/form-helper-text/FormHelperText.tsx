import {
	forwardRef,
	useContext,
} from 'react'

import {
	StyleSheet,
	View,
} from 'react-native'

import {
	StyleSheet as CarbonStyleSheet,
} from '../../_style-sheet'

import {
	ThemeContext,
} from '../../contexts'

import {
	FlexStyle,
} from '../../styles'

import {
	Text,
} from '../text'

import type {
	FormHelperTextProps,
} from './FormHelperTextProps'

import type {
	FormHelperTextRef,
} from './FormHelperTextRef'

export const FormHelperText = forwardRef<FormHelperTextRef, FormHelperTextProps>(
	function FormHelperText(
		{
			error,
			text,
			textLeading,
			textTrailing,
			textProps,
			style,
			...props
		},
		ref,
	) {

		useContext(ThemeContext)

		return (
			<View
				{ ...props }
				ref={ ref }
				style={ [
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
						error ? carbonStyle.textError : carbonStyle.text,
						textProps?.style,
					] }
				>
					{ text }
				</Text>

				{ textTrailing }
			</View>
		)

	},
)

const
	baseStyle =
		StyleSheet.create({
			container: {
				gap: 8,
			},
		}),

	carbonStyle =
		CarbonStyleSheet.create({
			text: {
				color: CarbonStyleSheet.color.text_primary,
			},
			textError: {
				color: CarbonStyleSheet.color.text_error,
			},
		})
