import {
	forwardRef,
	useContext,
} from 'react'

import {
	StyleSheet,
	View,
} from 'react-native'

import {
	GlobalConfigContext,
} from '../../_internal/contexts'

import {
	CommonStyleSheet,
	FlexStyleSheet,
} from '../../_internal/style-sheets'

import {
	CarbonStyleSheet,
} from '../../carbon-style-sheet'

import {
	ThemeContext,
} from '../../contexts'

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
			dir,
			...props
		},
		ref,
	) {

		useContext(ThemeContext)

		const
			globalConfigContext =
				useContext(GlobalConfigContext)

		return (
			<View
				{ ...props }
				ref={ ref }
				dir={ dir ?? globalConfigContext.rtl ? 'rtl' : undefined }
				style={ [
					FlexStyleSheet.flex_row,
					baseStyle.container,
					globalConfigContext.rtl ? CommonStyleSheet.rtl : undefined,
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
