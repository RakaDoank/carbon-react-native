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

export type CheckboxInputState =
	| 'unselected'
	| 'selected'
	| 'indeterminate'

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
	controlled?: boolean,
	state?: CheckboxInputState,
	interactiveState?: CheckboxInputInteractiveState,
	onChange?: (state: CheckboxInputState) => void,
	style?: ViewProps['style'],
}

interface CheckboxInputRefBase {
	readonly stateValue: CheckboxInputState,
	/**
	 * This method does nothing when `controlled` prop is true  
	 * Intentionally with postfix `Value` to avoid conflict setState method from View
	 */
	setStateValue: (state: CheckboxInputState | ((currentState: CheckboxInputState) => CheckboxInputState)) => void,
}

export interface CheckboxInputRef extends View, CheckboxInputRefBase {
}

export const CheckboxInput = forwardRef<CheckboxInputRef, CheckboxInputProps>(
	function CheckboxInput(
		{
			controlled,
			state: stateProp = 'unselected',
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
					state: stateProp,
				}),

			[isFocused, setIsFocused] =
				useState(false),

			[stateSelf, setStateSelf] =
				useState<CheckboxInputState>(stateProp),

			state =
				controlled ? stateProp : stateSelf,

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
						ref.current.state = mapStateToggler[ref.current.state]
						setStateSelf(ref.current.state)
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
				ref.current.state = state
				onChange?.(state)
			}
		}, [
			state,
			onChange,
		])

		useImperativeHandle(forwardedRef, () => {
			return Object.assign<View, CheckboxInputRefBase>(
				viewRef.current as View,
				{
					get stateValue() {
						return ref.current.state
					},
					setStateValue(state_) {
						if(!controlled) {
							if(typeof state_ === 'function') {
								ref.current.state = state_(ref.current.state)
							} else {
								ref.current.state = state_
							}
							setStateSelf(ref.current.state)
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
					FlexStyle.flex_initial,
					FlexStyle.items_center,
					FlexStyle.justify_center,
					CommonStyle.relative,
					baseStyle.checkbox,
					getInteractiveStateStyle(interactiveState, state, themeContext.color),
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

				{ state === 'indeterminate' ? (
					<IconSubtractComponent
						color={ iconColor }
						stroke={ iconColor }
					/>
				) : (
					<IconCheckmarkComponent
						color={ iconColor }
						stroke={ iconColor }
						style={ state === 'unselected' ? baseStyle.checkmarkHidden : null }
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

	mapStateToggler: Record<CheckboxInputState, CheckboxInputState> =
		{
			indeterminate: 'selected',
			selected: 'unselected',
			unselected: 'selected',
		},

	mapInteractiveStateStyle: Record<
		CheckboxInputInteractiveState,
		Record<
			CheckboxInputState,
			Partial<Record<
				Extract<keyof ViewStyle, 'borderColor' | 'backgroundColor'>,
				keyof typeof GRAY_10
			>>
		>
	> =
		{
			normal: {
				indeterminate: {
					borderColor: 'icon_primary',
					backgroundColor: 'icon_primary',
				},
				selected: {
					borderColor: 'icon_primary',
					backgroundColor: 'icon_primary',
				},
				unselected: {
					borderColor: 'icon_primary',
				},
			},
			disabled: {
				indeterminate: {
					borderColor: 'icon_disabled',
					backgroundColor: 'icon_disabled',
				},
				selected: {
					borderColor: 'icon_disabled',
					backgroundColor: 'icon_disabled',
				},
				unselected: {
					borderColor: 'icon_disabled',
				},
			},
			error: {
				indeterminate: {
					borderColor: 'support_error',
					backgroundColor: 'icon_primary',
				},
				selected: {
					borderColor: 'support_error',
					backgroundColor: 'icon_primary',
				},
				unselected: {
					borderColor: 'support_error',
				},
			},
			read_only: {
				indeterminate: {
					borderColor: 'icon_disabled',
				},
				selected: {
					borderColor: 'icon_disabled',
				},
				unselected: {
					borderColor: 'icon_disabled',
				},
			},
			warning: {
				indeterminate: {
					borderColor: 'icon_primary',
					backgroundColor: 'icon_primary',
				},
				selected: {
					borderColor: 'icon_primary',
					backgroundColor: 'icon_primary',
				},
				unselected: {
					borderColor: 'icon_primary',
				},
			},
		}

function getInteractiveStateStyle(
	interactiveState: CheckboxInputInteractiveState,
	state: CheckboxInputState,
	color: ThemeContext['color'],
) {
	const style = mapInteractiveStateStyle[interactiveState][state]
	return Object.entries(style).reduce((
		accumulator: ViewStyle,
		[key_, val],
	) => {
		const key = key_ as keyof typeof mapInteractiveStateStyle['normal']['indeterminate']
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
