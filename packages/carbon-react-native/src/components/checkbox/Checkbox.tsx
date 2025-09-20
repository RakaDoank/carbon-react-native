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
} from '@audira/carbon-react-native-elements'

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
	CheckboxInput,
	type CheckboxInputInteractiveState,
	type CheckboxInputRef,
} from '../checkbox-input'

import {
	FormLabel,
} from '../form-label'

import type {
	CheckboxProps,
} from './CheckboxProps'
import type {
	CheckboxRef,
} from './CheckboxRef'
import type {
	RefBase,
} from './_RefBase'


export const Checkbox = forwardRef<CheckboxRef, CheckboxProps>(
	function Checkbox(
		{
			defaultValue,
			value,
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

		useContext(ThemeContext)

		const
			checkboxInputRef =
				useRef<CheckboxInputRef>(null),

			viewRef =
				useRef<View>(null),

			pressHandler: NonNullable<PressableProps['onPress']> =
				useCallback(event => {
					onPress?.(event)
					if(checkboxInputRef.current) {
						checkboxInputRef.current.setValue(
							checkboxInputRef.current.value === null
								? true
								: !checkboxInputRef.current.value,
						)
					}
				}, [
					onPress,
				])

		useImperativeHandle(forwardedRef, () => {
			return Object.assign<View, RefBase>(
				(viewRef.current ?? {
				}) as View,
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
					FlexStyleSheet.flex_row,
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
						CommonStyleSheet.absolute,
						CommonStyleSheet.w_full,
						CommonStyleSheet.h_full,
						baseStyle.pressable,
						pressableProps?.style,
					] }
				/>

				<CheckboxInput
					{ ...checkboxInputProps }
					role="none"
					defaultValue={ defaultValue }
					value={ value }
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
				marginLeft: Spacing.spacing_03,
			},
		}),

	textColorStyle =
		CarbonStyleSheet.create<
			Record<CheckboxInputInteractiveState, TextStyle>
		>({
			normal: {
				color: CarbonStyleSheet.color.text_primary,
			},
			disabled: {
				color: CarbonStyleSheet.color.text_disabled,
			},
			error: {
				color: CarbonStyleSheet.color.text_primary,
			},
			read_only: {
				color: CarbonStyleSheet.color.text_primary,
			},
			warning: {
				color: CarbonStyleSheet.color.text_primary,
			},
		})
