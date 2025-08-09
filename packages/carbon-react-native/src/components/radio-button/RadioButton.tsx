import {
	forwardRef,
	useCallback,
	useContext,
	useImperativeHandle,
	useRef,
} from 'react'

import {
	Pressable,
	StyleSheet,
	View,
	type PressableProps,
	type TextStyle,
} from 'react-native'

import {
	Spacing,
	type ColorToken,
} from '@audira/carbon-react-native-elements'

import {
	ThemeContext,
} from '../../contexts'

import {
	CommonStyle,
	FlexStyle,
} from '../../styles'

import {
	FormLabel,
} from '../form-label'

import {
	RadioButtonInput,
	type RadioButtonInputInteractiveState,
	type RadioButtonInputRef,
} from '../radio-button-input'

import type {
	RefBase,
} from './_RefBase'

import type {
	RadioButtonProps,
} from './RadioButtonProps'

import type {
	RadioButtonRef,
} from './RadioButtonRef'

export const RadioButton = forwardRef<RadioButtonRef, RadioButtonProps>(
	function RadioButton(
		{
			defaultChecked,
			checked,
			value,
			interactiveState = 'normal',
			label,
			role = 'radio',
			'aria-label': ariaLabel,
			onChange,
			onPress,
			radioButtonInputProps,
			formLabelProps,
			pressableProps,
			style,
			...props
		},
		forwardedRef,
	) {

		const
			themeContext =
				useContext(ThemeContext),

			radioButtonInputRef =
				useRef<RadioButtonInputRef>(null),

			viewRef =
				useRef<View>(null),

			pressHandler: NonNullable<PressableProps['onPress']> =
				useCallback(event => {
					onPress?.(event)
					radioButtonInputRef.current?.setChecked(true)
				}, [
					onPress,
				])

		useImperativeHandle(forwardedRef, () => {
			return Object.assign<View, RefBase>(
				(viewRef.current ?? {}) as View,
				{
					get checked() {
						return radioButtonInputRef.current!.checked
					},
					setChecked(checked_) {
						radioButtonInputRef.current?.setChecked(checked_)
					},
				},
			)
		}, [])

		return (
			<View
				{ ...props }
				aria-label={ ariaLabel || label }
				style={ [
					FlexStyle.flex_row,
					style,
				] }
				ref={ viewRef }
			>
				<Pressable
					{ ...pressableProps }
					role={ role }
					disabled={ interactiveState === 'disabled' }
					aria-label={ pressableProps?.['aria-label'] ?? label }
					onPress={ pressHandler }
					style={ [
						CommonStyle.absolute,
						CommonStyle.w_full,
						CommonStyle.h_full,
						baseStyle.pressable,
						pressableProps?.style,
					] }
				/>

				<RadioButtonInput
					{ ...radioButtonInputProps }
					role="none"
					defaultChecked={ defaultChecked }
					checked={ checked }
					value={ value }
					interactiveState={ interactiveState }
					onChange={ onChange }
					onPress={ onPress }
					style={ [
						baseStyle.radioButtonInput,
						radioButtonInputProps?.style,
					] }
					ref={ radioButtonInputRef }
				/>

				<FormLabel
					{ ...formLabelProps }
					label={ label }
					textProps={{
						...formLabelProps?.textProps,
						type: formLabelProps?.textProps?.type || 'body_compact_01',
						style: [
							getTextColorStyle(interactiveState, themeContext.color),
							formLabelProps?.textProps?.style,
						],
					}}
					style={ [
						baseStyle.label,
						formLabelProps?.style,
					] }
				/>
			</View>
		)

	},
)

const
	baseStyle =
		StyleSheet.create({
			pressable: {
				zIndex: 1,
			},
			radioButtonInput: {
				zIndex: 2,
			},
			label: {
				marginLeft: Spacing.spacing_03,
			},
		}),

	mapTextColor: Record<
		RadioButtonInputInteractiveState,
		ColorToken
	> =
		{
			normal: 'text_primary',
			disabled: 'text_disabled',
			error: 'text_primary',
			read_only: 'text_primary',
			warning: 'text_primary',
		}

function getTextColorStyle(
	interactiveState: RadioButtonInputInteractiveState,
	color: ThemeContext['color'],
): TextStyle {
	return {
		color: color[mapTextColor[interactiveState]],
	}
}
