import {
	forwardRef,
	useCallback,
	useContext,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from 'react'

import {
	Pressable,
	StyleSheet,
	View,
	type PressableProps,
	type ViewStyle,
} from 'react-native'

import {
	Color,
} from '@audira/carbon-react-native-elements'

import IconCheckmark from '@carbon/icons/svg/32/checkmark.svg'
import IconSubtract from '@carbon/icons/svg/32/subtract.svg'

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

import type {
	CheckboxInputInteractiveState,
} from './CheckboxInputInteractiveState'

import type {
	CheckboxInputProps,
} from './CheckboxInputProps'

import type {
	CheckboxInputRef,
} from './CheckboxInputRef'

import type {
	CheckboxInputValue,
} from './CheckboxInputValue'

import type {
	RefBase,
} from './_RefBase'

export const CheckboxInput = forwardRef<CheckboxInputRef, CheckboxInputProps>(
	function CheckboxInput(
		{
			defaultValue,
			value: valueProp,
			interactiveState = 'normal',
			style,
			role = 'checkbox',
			onBlur,
			onChange,
			onFocus,
			onPress,
			...props
		},
		forwardedRef,
	) {

		const
			themeContext =
				useContext(ThemeContext),

			viewRef =
				useRef<View>(null),

			ref =
				useRef({
					onChangeEffect: false,
					value: typeof valueProp == 'boolean' || typeof valueProp == 'object'
						? valueProp
						: typeof defaultValue == 'boolean' || typeof defaultValue == 'object'
							? defaultValue
							: false,
				}),

			[isFocused, setIsFocused] =
				useState(false),

			[valueSelf, setValueSelf] =
				useState(() => {
					if(typeof defaultValue == 'boolean' || typeof defaultValue == 'object') {
						return defaultValue
					}
					return false
				}),

			controlled =
				typeof valueProp !== 'undefined',

			value =
				controlled ? valueProp : valueSelf,

			indeterminate =
				value === null,

			blurHandler: NonNullable<PressableProps['onBlur']> =
				useCallback(event => {
					onBlur?.(event)
					setIsFocused(false)
				}, [
					onBlur,
				]),

			focusHandler: NonNullable<PressableProps['onFocus']> =
				useCallback(event => {
					onFocus?.(event)
					setIsFocused(true)
				}, [
					onFocus,
				]),

			pressHandler: NonNullable<PressableProps['onPress']> =
				useCallback(event => {
					onPress?.(event)
					if(interactiveState !== 'read_only') {
						if(!controlled) {
							ref.current.onChangeEffect = true
							setValueSelf(self => self === null ? true : !self)
						} else {
							onChange?.(ref.current.value === null ? true : !ref.current.value)
						}
					}
				}, [
					controlled,
					interactiveState,
					onPress,
					onChange,
				]),

			iconColor =
				mapIconColor[interactiveState][themeContext.colorScheme]

		useEffect(() => {
			if(ref.current.onChangeEffect) {
				ref.current.onChangeEffect = false
				ref.current.value = value
				onChange?.(value)
			}
		}, [
			value,
			onChange,
		])

		useImperativeHandle(forwardedRef, () => {
			return Object.assign<View, RefBase>(
				viewRef.current as View,
				{
					get value() {
						return value
					},
					setValue(value_) {
						if(!controlled && interactiveState !== 'read_only') {
							ref.current.onChangeEffect = true
							setValueSelf(self => {
								if(typeof value_ === 'function') {
									ref.current.value = value_(self)
								} else {
									ref.current.value = value_
								}
								return ref.current.value
							})
						}
					},
				},
			)
		}, [
			value,
			controlled,
			interactiveState,
		])

		return (
			<Pressable
				{ ...props }
				disabled={ interactiveState === 'disabled' }
				role={ role }
				onBlur={ blurHandler }
				onFocus={ focusHandler }
				onPress={ pressHandler }
				style={ [
					FlexStyleSheet.items_center,
					FlexStyleSheet.justify_center,
					CommonStyleSheet.relative,
					baseStyle.checkbox,
					getInteractiveStateStyle(interactiveState, value),
					style,
				] }
				ref={ viewRef }
			>
				<View
					style={ [
						CommonStyleSheet.absolute,
						CommonStyleSheet.overflow_hidden,
						baseStyle.focusBox,
						isFocused
							? carbonStyle.focusBox
							: null,
					] }
				/>

				{ value && indeterminate ? (
					<IconSubtract
						width={ iconSize }
						height={ iconSize }
						color={ iconColor }
						stroke={ iconColor }
					/>
				) : (
					<IconCheckmark
						width={ iconSize }
						height={ iconSize }
						color={ iconColor }
						stroke={ iconColor }
						style={ !value ? baseStyle.checkmarkHidden : null }
					/>
				) }
			</Pressable>
		)

	},
)

const
	size =
		18,

	iconSize =
		size - 4,

	baseStyle =
		StyleSheet.create({
			checkbox: {
				width: size,
				height: size,
				borderWidth: 1,
			},
			focusBox: {
				width: size + 6,
				height: size + 6,
				borderRadius: 4,
				borderWidth: 2,
				borderColor: 'transparent',
			},
			checkmarkHidden: {
				opacity: 0,
			},
		}),

	interactiveStyle =
		CarbonStyleSheet.create<
			Record<`${CheckboxInputInteractiveState}_${'true' | 'false'}`, ViewStyle>
		>({
			normal_false: {
				borderColor: CarbonStyleSheet.color.icon_primary,
			},
			normal_true: {
				backgroundColor: CarbonStyleSheet.color.icon_primary,
				borderColor: CarbonStyleSheet.color.icon_primary,
			},
			disabled_false: {
				borderColor: CarbonStyleSheet.color.icon_disabled,
			},
			disabled_true: {
				backgroundColor: CarbonStyleSheet.color.icon_disabled,
				borderColor: CarbonStyleSheet.color.icon_disabled,
			},
			error_false: {
				borderColor: CarbonStyleSheet.color.support_error,
			},
			error_true: {
				backgroundColor: CarbonStyleSheet.color.icon_primary,
				borderColor: CarbonStyleSheet.color.support_error,
			},
			read_only_false: {
				borderColor: CarbonStyleSheet.color.icon_disabled,
			},
			read_only_true: {
				borderColor: CarbonStyleSheet.color.icon_disabled,
			},
			warning_false: {
				borderColor: CarbonStyleSheet.color.icon_primary,
			},
			warning_true: {
				backgroundColor: CarbonStyleSheet.color.icon_primary,
				borderColor: CarbonStyleSheet.color.icon_primary,
			},
		}),

	carbonStyle =
		CarbonStyleSheet.create({
			focusBox: {
				borderColor: CarbonStyleSheet.color.focus,
			},
		}),

	mapIconColor: Record<CheckboxInputInteractiveState, Record<ThemeContext['colorScheme'], string>> =
		{
			normal: {
				gray_10: Color.Token.gray_10.icon_inverse,
				gray_100: Color.Token.gray_100.icon_inverse,
			},
			disabled: {
				gray_10: Color.Token.gray_10.icon_inverse,
				gray_100: Color.Token.gray_100.icon_inverse,
			},
			error: {
				gray_10: Color.Token.gray_10.icon_inverse,
				gray_100: Color.Token.gray_100.icon_inverse,
			},
			read_only: {
				gray_10: Color.Token.gray_10.icon_primary,
				gray_100: Color.Token.gray_100.icon_primary,
			},
			warning: {
				gray_10: Color.Token.gray_10.icon_inverse,
				gray_100: Color.Token.gray_100.icon_inverse,
			},
		}

function getInteractiveStateStyle(
	interactiveState: CheckboxInputInteractiveState,
	value: CheckboxInputValue,
) {
	return interactiveStyle[`${interactiveState}_${!!value}`]
}
