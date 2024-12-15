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

export type RadioButtonInputInteractiveState =
	| 'normal'
	| 'disabled'
	| 'read_only'
	| 'error'
	| 'warning'

export interface RadioButtonInputProps extends Omit<
	PressableProps,
	| 'children'
	| 'disabled'
	| 'style'
> {
	controlled?: boolean,
	checked?: boolean,
	value?: string | number,
	interactiveState?: RadioButtonInputInteractiveState,
	onChange?: (
		checked: NonNullable<RadioButtonInputProps['checked']>,
		value: RadioButtonInputProps['value'],
	) => void,
	style?: ViewProps['style'],
}

interface RadioButtonInputRefBase {
	readonly checked: boolean,
	/**
	 * This method does nothing if `controlled` prop is true
	 */
	setChecked: (checked: boolean | ((checked: boolean) => boolean)) => void,
}

export interface RadioButtonInputRef extends View, RadioButtonInputRefBase {
}

export const RadioButtonInput = forwardRef<RadioButtonInputRef, RadioButtonInputProps>(
	function RadioButtonInput(
		{
			controlled,
			checked: checkedProp = false,
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
					checked: checkedProp,
				}),

			[isFocused, setIsFocused] =
				useState(false),

			[checkedSelf, setCheckedSelf] =
				useState(checkedProp),

			checked =
				controlled ? checkedProp : checkedSelf,

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
			return Object.assign<View, RadioButtonInputRefBase>(
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
				}
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

	}
)

type InteractiveStateStyle =
	Partial<
		Record<
			Extract<keyof ViewStyle, 'borderColor' | 'backgroundColor'>,
			keyof typeof GRAY_10
		>
	>

const
	size =
		16,

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
