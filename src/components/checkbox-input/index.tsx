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
	type ViewProps,
	type ViewStyle,
} from 'react-native'

import type GRAY_10 from '../../constants/color/tokens/gray-10'

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

export type CheckboxInputInteractiveState =
	| 'normal'
	| 'disabled'
	| 'read_only'
	| 'error'
	| 'warning'

export interface CheckboxInputProps extends Omit<
	PressableProps,
	| 'children'
	| 'disabled'
	| 'style'
> {
	/**
	 * Control `value` and `indeterminate` prop
	 */
	controlled?: boolean,
	value?: boolean,
	indeterminate?: boolean,
	interactiveState?: CheckboxInputInteractiveState,
	onChange?: (value: boolean) => void,
	style?: ViewProps['style'],
}

interface CheckboxInputRefBase {
	readonly value: boolean,
	/**
	 * This method does nothing when `controlled` prop is true  
	 */
	setValue: (value: boolean | ((value: boolean, indeterminate: boolean) => boolean)) => void,
}

export interface CheckboxInputRef extends View, CheckboxInputRefBase {
}

export const CheckboxInput = forwardRef<CheckboxInputRef, CheckboxInputProps>(
	function CheckboxInput(
		{
			controlled,
			value: valueProp,
			indeterminate: indeterminateProp,
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
					isMounted: false,
					value: !!valueProp,
				}),

			[isFocused, setIsFocused] =
				useState(false),

			[state, setState] =
				useState({
					value: !!valueProp,
					indeterminate: !!indeterminateProp,
				}),

			value =
				controlled ? !!valueProp : state.value,

			indeterminate =
				controlled
					? indeterminateProp
					: state.indeterminate,

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
					if(!controlled && interactiveState !== 'read_only') {
						setState(state_ => {
							return {
								value: state_.indeterminate ? true : !state_.value,
								indeterminate: false,
							}
						})
					}
				}, [
					controlled,
					interactiveState,
					onPress,
				]),

			iconColor =
				getIconColor(interactiveState, themeContext.color)

		useEffect(() => {
			if(!ref.current.isMounted) {
				ref.current.isMounted = true
			} else {
				ref.current.value = value
				onChange?.(value)
			}
		}, [
			value,
			onChange,
		])

		useImperativeHandle(forwardedRef, () => {
			return Object.assign<View, CheckboxInputRefBase>(
				viewRef.current as View,
				{
					get value() {
						return ref.current.value
					},
					setValue(value_) {
						if(!controlled) {
							setState(state_ => {
								if(typeof value_ === 'function') {
									ref.current.value = value_(state_.value, state_.indeterminate)
								} else {
									ref.current.value = value_
								}
								return {
									value: ref.current.value,
									indeterminate: false,
								}
							})
						}
					},
				},
			)
		}, [
			controlled,
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
					getInteractiveStateStyle(interactiveState, value, themeContext.color),
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

	}
)

const
	size =
		16,

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

	mapInteractiveStateStyle: Record<
		CheckboxInputInteractiveState,
		Record<
			'true' | 'false',
			Partial<Record<
				Extract<keyof ViewStyle, 'borderColor' | 'backgroundColor'>,
				keyof typeof GRAY_10
			>>
		>
	> =
		{
			normal: {
				true: {
					borderColor: 'icon_primary',
					backgroundColor: 'icon_primary',
				},
				false: {
					borderColor: 'icon_primary',
				},
			},
			disabled: {
				true: {
					borderColor: 'icon_disabled',
					backgroundColor: 'icon_disabled',
				},
				false: {
					borderColor: 'icon_disabled',
				},
			},
			error: {
				true: {
					borderColor: 'support_error',
					backgroundColor: 'icon_primary',
				},
				false: {
					borderColor: 'support_error',
				},
			},
			read_only: {
				true: {
					borderColor: 'icon_disabled',
				},
				false: {
					borderColor: 'icon_disabled',
				},
			},
			warning: {
				true: {
					borderColor: 'icon_primary',
					backgroundColor: 'icon_primary',
				},
				false: {
					borderColor: 'icon_primary',
				},
			},
		}

function getInteractiveStateStyle(
	interactiveState: CheckboxInputInteractiveState,
	value: boolean,
	color: ThemeContext['color'],
) {
	const style = mapInteractiveStateStyle[interactiveState][`${value}`]
	return Object.entries(style).reduce((
		accumulator: ViewStyle,
		[key_, val],
	) => {
		const key = key_ as keyof typeof mapInteractiveStateStyle['normal']['true']
		accumulator[key] = color[val]
		return accumulator
	}, {})
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
