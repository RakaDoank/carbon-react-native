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
	StyleSheet as StyleSheetColor,
} from '../../_style-sheet'

import {
	ThemeContext,
} from '../../contexts'

import {
	CommonStyle,
	FlexStyle,
} from '../../styles'

import {
	Icon,
	type IconProps,
} from '../icon'

import IconCheckmark from '@carbon/icons/es/checkmark/20'
import IconSubtract from '@carbon/icons/es/subtract/20'

import type {
	RefBase,
} from './_RefBase'

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
				getIconColor(interactiveState, themeContext.color)

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
					FlexStyle.items_center,
					FlexStyle.justify_center,
					CommonStyle.relative,
					baseStyle.checkbox,
					// getInteractiveStateStyle(interactiveState, value, themeContext.color),
					getInteractiveStateStyle(interactiveState, value),
					style,
				] }
				ref={ viewRef }
			>
				<View
					style={ [
						CommonStyle.absolute,
						CommonStyle.overflow_hidden,
						baseStyle.focusBox,
						isFocused
							? { borderColor: themeContext.color.focus }
							: null,
					] }
				/>

				{ value && indeterminate ? (
					<IconSubtractComponent
						color={ iconColor }
						stroke={ iconColor }
					/>
				) : (
					<IconCheckmarkComponent
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
		StyleSheetColor.create<
			Record<`${CheckboxInputInteractiveState}_${'true' | 'false'}`, ViewStyle>
		>({
			normal_false: {
				borderColor: StyleSheetColor.color.icon_primary,
			},
			normal_true: {
				backgroundColor: StyleSheetColor.color.icon_primary,
				borderColor: StyleSheetColor.color.icon_primary,
			},
			disabled_false: {
				borderColor: StyleSheetColor.color.icon_disabled,
			},
			disabled_true: {
				backgroundColor: StyleSheetColor.color.icon_disabled,
				borderColor: StyleSheetColor.color.icon_disabled,
			},
			error_false: {
				borderColor: StyleSheetColor.color.support_error,
			},
			error_true: {
				backgroundColor: StyleSheetColor.color.icon_primary,
				borderColor: StyleSheetColor.color.support_error,
			},
			read_only_false: {
				borderColor: StyleSheetColor.color.icon_disabled,
			},
			read_only_true: {
				borderColor: StyleSheetColor.color.icon_disabled,
			},
			warning_false: {
				borderColor: StyleSheetColor.color.icon_primary,
			},
			warning_true: {
				backgroundColor: StyleSheetColor.color.icon_primary,
				borderColor: StyleSheetColor.color.icon_primary,
			},
		})

function getInteractiveStateStyle(
	interactiveState: CheckboxInputInteractiveState,
	value: CheckboxInputValue,
) {
	return interactiveStyle[`${interactiveState}_${!!value}`]
}

function getIconColor(
	interactiveState: CheckboxInputInteractiveState,
	color: ThemeContext['color'],
) {
	if(interactiveState === 'read_only') {
		return color.icon_primary
	}
	return color.icon_inverse
}

interface IconComponentProps extends Omit<IconProps, 'src'> {
}

function IconCheckmarkComponent({
	width = iconSize,
	height = iconSize,
	...props
}: IconComponentProps) {

	return (
		<Icon
			{ ...props }
			src={ IconCheckmark }
			width={ width }
			height={ height }
		/>
	)

}

function IconSubtractComponent({
	width = iconSize,
	height = iconSize,
	...props
}: IconComponentProps) {

	return (
		<Icon
			{ ...props }
			src={ IconSubtract }
			width={ width }
			height={ height }
		/>
	)

}
