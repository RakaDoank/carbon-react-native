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
	CheckboxInput,
	type CheckboxInputInteractiveState,
	type CheckboxInputProps,
	type CheckboxInputRef,
} from '../checkbox-input'

import {
	FormLabel,
	type FormLabelProps,
} from '../form-label'

export interface CheckboxProps extends Omit<ViewProps, 'children'> {
	/**
	 * Control `value` and `indeterminate` prop
	 */
	controlled?: boolean,
	value?: boolean,
	indeterminate?: CheckboxInputProps['indeterminate'],
	interactiveState?: CheckboxInputInteractiveState,
	label: string,
	onChange?: CheckboxInputProps['onChange'],
	onPress?: CheckboxInputProps['onPress'],
	checkboxInputProps?: Omit<
		CheckboxInputProps,
		| 'controlled'
		| 'value'
		| 'indeterminate'
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

interface CheckboxRefBase {
	readonly value: boolean,
	/**
	 * This method does nothing when `controlled` prop is true  
	 * Intentionally with postfix `Value` to avoid conflict setState method from View
	 */
	setValue: CheckboxInputRef['setValue'],
}

export interface CheckboxRef extends View, CheckboxRefBase {
}

export const Checkbox = forwardRef<CheckboxRef, CheckboxProps>(
	function Checkbox(
		{
			controlled,
			value,
			indeterminate,
			interactiveState = 'normal',
			label,
			'aria-label': ariaLabel,
			onChange,
			onPress,
			checkboxInputProps,
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

			checkboxInputRef =
				useRef<CheckboxInputRef>(null),

			viewRef =
				useRef<View>(null),

			pressHandler: NonNullable<PressableProps['onPress']> =
				useCallback(event => {
					onPress?.(event)
					checkboxInputRef.current?.setValue(
						(currentValue, indeterminate_) => {
							if(indeterminate_ && currentValue) {
								return true
							}
							return !currentValue
						}
					)
				}, [
					onPress,
				])

		useImperativeHandle(forwardedRef, () => {
			return Object.assign<View, CheckboxRefBase>(
				(viewRef.current ?? {}) as View,
				{
					get value() {
						return checkboxInputRef.current!!.value
					},
					setValue(value_) {
						checkboxInputRef.current?.setValue(value_)
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
					role="checkbox"
					disabled={ interactiveState === 'disabled' }
					aria-label={ pressableProps?.['aria-label'] || label }
					onPress={ pressHandler }
					style={ [
						CommonStyle.absolute,
						CommonStyle.w_full,
						CommonStyle.h_full,
						baseStyle.pressable,
						pressableProps?.style,
					] }
				/>

				<CheckboxInput
					{ ...checkboxInputProps }
					role="none"
					controlled={ controlled }
					value={ value }
					indeterminate={ indeterminate }
					interactiveState={ interactiveState }
					onChange={ onChange }
					onPress={ onPress }
					style={ [
						baseStyle.checkboxInput,
						checkboxInputProps?.style,
					] }
					ref={ checkboxInputRef }
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
			checkboxInput: {
				zIndex: 2,
			},
			label: {
				marginLeft: SpacingConstant.spacing_03,
			},
		}),

	mapTextColor: Record<
		CheckboxInputInteractiveState,
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
	interactiveState: CheckboxInputInteractiveState,
	color: ThemeContext['color'],
): TextStyle {
	return {
		color: color[mapTextColor[interactiveState]],
	}
}
