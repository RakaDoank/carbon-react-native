import {
	useContext,
	useRef,
} from 'react'

import {
	TextInput as RNTextInput,
	View,
	type TextInputProps as RNTextInputProps,
} from 'react-native'

import {
	Button,
	FlexStyle,
	FormLabel,
	FormHelperText,
	StyleSheet,
	ThemeContext,
} from '@audira/carbon-react-native'

import {
	Spacing,
} from '@audira/carbon-react-native-elements'

import {
	ItemBase,
	type ItemBaseProps,
} from '../_item-base'

import IconCheckmark from '@carbon/icons/es/checkmark/20'

export interface TextProps extends Omit<
	ItemBaseProps,
	| 'children'
	| 'onSubmit'
> {
	label: string,
	value: string,
	description?: string,
	descriptionError?: boolean,
	onSubmit?: (value: string) => void,
}

export function Text({
	label,
	value,
	description,
	descriptionError,
	onSubmit,
	...viewProps
}: TextProps) {

	useContext(ThemeContext)

	const
		ref =
			useRef({
				value,
			}),

		onChange: RNTextInputProps['onChange'] =
			e => {
				ref.current.value = e.nativeEvent.text
			},

		onPress: Button.GhostIconProps['onPress'] =
			() => {
				onSubmit?.(ref.current.value)
			}

	return (
		<ItemBase
			{ ...viewProps }
		>
			<FormLabel
				label={ label }
				style={ style.label }
			/>

			<View
				style={ [
					FlexStyle.flex_initial,
					FlexStyle.flex_row,
				] }
			>
				<RNTextInput
					defaultValue={ value }
					onChange={ onChange }
					style={ [
						FlexStyle.flex_initial,
						style.textInput,
					] }
				/>
				<Button.Primary
					icon={ IconCheckmark }
					onPress={ onPress }
					style={ [] }
				/>
			</View>

			{ !!description && (
				<FormHelperText
					text={ description }
					error={ descriptionError }
				/>
			) }
		</ItemBase>
	)

}

const style = StyleSheet.create({
	label: {
		marginBottom: Spacing.spacing_03,
	},
	textInput: {
		width: '100%',
		backgroundColor: StyleSheet.color.background,
		padding: Spacing.spacing_04,
		border: 0,
		color: StyleSheet.color.text_primary,
	},
})
