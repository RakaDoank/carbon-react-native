import {
	StyleSheet,
	View,
	type ViewProps,
} from 'react-native'

import {
	FlexStyle,
} from '../../styles'

import {
	Text,
	type TextProps,
} from '../text'

export interface FormLabelProps extends Omit<ViewProps, 'children'> {
	label: string,
	labelLeading?: React.ReactNode,
	labelTrailing?: React.ReactNode,
	textProps?: Omit<
		TextProps,
		| 'aria-label'
	>,
}

export function FormLabel({
	label,
	labelLeading,
	labelTrailing,
	textProps,
	style,
	...props
}: FormLabelProps) {

	return (
		<View
			{ ...props }
			style={ [
				FlexStyle.flex_initial,
				FlexStyle.flex_row,
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

}

const
	baseStyle =
		StyleSheet.create({
			gap: {
				gap: 8,
			},
		})
