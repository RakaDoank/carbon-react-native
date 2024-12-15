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
	type ViewProps,
} from 'react-native'

import {
	ThemeContext,
} from '../../contexts'

import {
	SpacingConstant,
} from '../../constants'
import type GRAY_10 from '../../constants/color/tokens/gray-10'

import {
	CommonStyle,
	FlexStyle,
} from '../../styles'

import {
	FormLabel,
	type FormLabelProps,
} from '../form-label'

import {
	RadioButtonInput,
	type RadioButtonInputProps,
	type RadioButtonInputInteractiveState,
	type RadioButtonInputRef,
} from '../radio-button-input'

export interface RadioButtonProps extends Omit<ViewProps, 'children'> {
	/**
	 * Control `checked` prop
	 */
	controlled?: boolean,
	checked?: boolean,
	value?: RadioButtonInputProps['value'],
	interactiveState?: RadioButtonInputInteractiveState,
	label: string,
	onChange?: RadioButtonInputProps['onChange'],
	onPress?: RadioButtonInputProps['onPress'],
	radioButtonInputProps?: Omit<
		RadioButtonInputProps,
		| 'controlled'
		| 'checked'
		| 'value'
		| 'interactiveState'
		| 'role'
		| 'onChange'
	>,
	formLabelProps?: Omit<FormLabelProps, 'label'>,
	pressableProps?: Omit<
		PressableProps,
		| 'role'
		| 'style'
		| 'onPress'
	> & {
		style?: ViewProps['style'],
	},
}

interface RadioButtonRefBase {
	readonly checked: boolean,
	/**
	 * This method does nothing when `controlled` prop is true
	 */
	setChecked: RadioButtonInputRef['setChecked'],
}

export interface RadioButtonRef extends View, RadioButtonRefBase {
}

export const RadioButton = forwardRef<RadioButtonRef, RadioButtonProps>(
	function RadioButton(
		{
			controlled,
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
			return Object.assign<View, RadioButtonRefBase>(
				(viewRef.current ?? {}) as View,
				{
					get checked() {
						return radioButtonInputRef.current!!.checked
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
					controlled={ controlled }
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

	}
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
				marginLeft: SpacingConstant.spacing_03,
			},
		}),

	mapTextColor: Record<
		RadioButtonInputInteractiveState,
		keyof typeof GRAY_10
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
