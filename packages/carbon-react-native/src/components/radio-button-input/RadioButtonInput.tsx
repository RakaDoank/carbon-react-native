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

import type {
	ColorToken,
} from '@audira/carbon-react-native-elements'

import {
	ThemeContext,
} from '../../contexts'

import {
	CommonStyle,
	FlexStyle,
} from '../../styles'

import type {
	RefBase,
} from './_RefBase'

import type {
	RadioButtonInputInteractiveState,
} from './RadioButtonInputInteractiveState'

import type {
	RadioButtonInputProps,
} from './RadioButtonInputProps'

import type {
	RadioButtonInputRef,
} from './RadioButtonInputRef'

export const RadioButtonInput = forwardRef<RadioButtonInputRef, RadioButtonInputProps>(
	function RadioButtonInput(
		{
			defaultChecked,
			checked: checkedProp,
			value,
			interactiveState = 'normal',
			role = 'radio',
			onChange,
			onBlur,
			onFocus,
			onPress,
			style,
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
					checked: defaultChecked ?? false,
				}),

			[isFocused, setIsFocused] =
				useState(false),

			[checkedSelf, setCheckedSelf] =
				useState(ref.current.checked),

			controlled =
				typeof checkedProp === 'boolean',

			checked =
				controlled ? !!checkedProp : checkedSelf,

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
					if(!controlled) {
						setCheckedSelf(true)
					}
				}, [
					controlled,
					onPress,
				])

		useEffect(() => {
			if(!ref.current.isMounted) {
				ref.current.isMounted = true
			} else {
				ref.current.checked = checked
				onChange?.(checked, value)
			}
		}, [
			checked,
			value,
			onChange,
		])

		useImperativeHandle(forwardedRef, () => {
			return Object.assign<View, RefBase>(
				(viewRef.current ?? {}) as View,
				{
					get checked() {
						return ref.current.checked
					},
					setChecked(checked_) {
						if(!controlled) {
							if(typeof checked_ === 'boolean') {
								ref.current.checked = checked_
							} else {
								ref.current.checked = checked_(ref.current.checked)
							}
							setCheckedSelf(ref.current.checked)
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
				role={ role }
				disabled={ interactiveState === 'disabled' }
				onBlur={ blurHandler }
				onFocus={ focusHandler }
				onPress={ pressHandler }
				style={ [
					FlexStyle.items_center,
					FlexStyle.justify_center,
					CommonStyle.relative,
					baseStyle.radioButton,
					getInteractiveStateStyle(
						'container',
						interactiveState,
						checked,
						themeContext.color,
					),
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

				<View
					style={ [
						FlexStyle.flex_initial,
						baseStyle.marker,
						getInteractiveStateStyle(
							'marker',
							interactiveState,
							checked,
							themeContext.color,
						),
					] }
				/>
			</Pressable>
		)

	},
)

type InteractiveStateStyle =
	Partial<
		Record<
			Extract<keyof ViewStyle, 'borderColor' | 'backgroundColor'>,
			ColorToken
		>
	>

const
	size =
		18,

	baseStyle =
		StyleSheet.create({
			radioButton: {
				width: size,
				height: size,
				borderRadius: size,
				borderWidth: 1,
			},
			focusBox: {
				width: size + 6,
				height: size + 6,
				borderRadius: size + 3,
				borderWidth: 2,
				borderColor: 'transparent',
			},
			marker: {
				borderRadius: size,
				width: size / 2,
				height: size / 2,
			},
		}),

	mapInteractiveStateStyle: Record<
		RadioButtonInputInteractiveState,
		Record<
			'true' | 'false',
			{
				container: InteractiveStateStyle,
				marker?: InteractiveStateStyle,
			}
		>
	> =
		{
			normal: {
				true: {
					container: {
						borderColor: 'icon_primary',
					},
					marker: {
						backgroundColor: 'icon_primary',
					},
				},
				false: {
					container: {
						borderColor: 'icon_primary',
					},
				},
			},
			disabled: {
				true: {
					container: {
						borderColor: 'icon_disabled',
					},
					marker: {
						backgroundColor: 'icon_disabled',
					},
				},
				false: {
					container: {
						borderColor: 'icon_disabled',
					},
				},
			},
			error: {
				true: {
					container: {
						borderColor: 'support_error',
					},
					marker: {
						backgroundColor: 'icon_primary',
					},
				},
				false: {
					container: {
						borderColor: 'support_error',
					},
				},
			},
			read_only: {
				true: {
					container: {
						borderColor: 'icon_disabled',
					},
					marker: {
						backgroundColor: 'icon_primary',
					},
				},
				false: {
					container: {
						borderColor: 'icon_disabled',
					},
				},
			},
			warning: {
				true: {
					container: {
						borderColor: 'icon_primary',
					},
					marker: {
						backgroundColor: 'icon_primary',
					},
				},
				false: {
					container: {
						borderColor: 'icon_primary',
					},
				},
			},
		}

function getInteractiveStateStyle(
	key: keyof typeof mapInteractiveStateStyle['normal']['true'],
	interactiveState: RadioButtonInputInteractiveState,
	checked: boolean,
	color: ThemeContext['color'],
) {
	const
		style =
			mapInteractiveStateStyle[interactiveState][`${checked}`],

		parsedStyle: ViewStyle = {}

	if(style[key]?.backgroundColor) {
		parsedStyle.backgroundColor = color[style[key].backgroundColor]
	}

	if(style[key]?.borderColor) {
		parsedStyle.borderColor = color[style[key].borderColor]
	}

	return parsedStyle
}
