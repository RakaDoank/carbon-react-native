import {
	forwardRef,
	useCallback,
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
	StyleSheet as StyleSheetColor,
} from '../../_style-sheet'

import {
	SpacingConstant,
} from '../../constants'

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
			role = 'checkbox',
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
						},
					)
				}, [
					onPress,
				])

		useImperativeHandle(forwardedRef, () => {
			return Object.assign<View, CheckboxRefBase>(
				(viewRef.current ?? {}) as View,
				{
					get value() {
						return checkboxInputRef.current!.value
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
							textColorStyle[interactiveState],
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
			checkboxInput: {
				zIndex: 2,
			},
			label: {
				marginLeft: SpacingConstant.spacing_03,
			},
		}),

	textColorStyle =
		StyleSheetColor.create<
			Record<CheckboxInputInteractiveState, TextStyle>
		>(color => {
			return {
				normal: {
					color: color.text_primary,
				},
				disabled: {
					color: color.text_disabled,
				},
				error: {
					color: color.text_primary,
				},
				read_only: {
					color: color.text_primary,
				},
				warning: {
					color: color.text_primary,
				},
			}
		})
