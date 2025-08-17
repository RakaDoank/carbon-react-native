import {
	forwardRef,
} from 'react'

import {
	StyleSheet,
	View,
} from 'react-native'

import {
	FlexStyleSheet,
} from '../../_internal/style-sheets'

import {
	Text,
} from '../text'

import type {
	FormLabelProps,
} from './FormLabelProps'

import type {
	FormLabelRef,
} from './FormLabelRef'

export const FormLabel = forwardRef<FormLabelRef, FormLabelProps>(
	function FormLabel(
		{
			label,
			labelLeading,
			labelTrailing,
			textProps,
			style,
			...props
		},
		ref,
	) {

		return (
			<View
				{ ...props }
				ref={ ref }
				style={ [
					FlexStyleSheet.flex_row,
					baseStyle.gap,
					style,
				] }
			>
				{ labelLeading }

				<Text
					{ ...textProps }
					type={ textProps?.type || 'label_01' }
					aria-label={ label }
				>
					{ label }
				</Text>

				{ labelTrailing }
			</View>
		)

	},
)

const
	baseStyle =
		StyleSheet.create({
			gap: {
				columnGap: 8,
			},
		})
