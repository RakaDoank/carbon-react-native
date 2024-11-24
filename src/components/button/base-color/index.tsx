import {
	useContext,
	useCallback,
	useState,
} from 'react'

import {
	StyleSheet,
	View,
	type TextStyle,
	type ViewStyle,
} from 'react-native'

import {
	ColorConstant,
} from '../../../constants'

import {
	ThemeContext,
} from '../../../contexts'

import {
	type ThemeType,
} from '../../../types'

import {
	Base,
	type BaseProps,
} from '../base'

export type BaseColorState =
	| 'default'
	| 'focused'
	| 'hovered'
	| 'pressed'
	| 'disabled'

export interface BaseColorProps extends Omit<BaseProps, 'backgroundNode' | 'iconColor'> {
	colorStateStyle: {
		background: Record<BaseColorState, ViewStyle>,
		text: Record<BaseColorState, TextStyle>,
		icon: Record<BaseColorState, string>,
	},
}

export function BaseColor({
	disabled,
	style,
	textStyle,
	colorStateStyle,
	onBlur,
	onFocus,
	onHoverIn,
	onHoverOut,
	onPressIn,
	onPressOut,
	...props
}: BaseColorProps) {

	const
		themeContext =
			useContext(ThemeContext),

		[state, setState] =
			useState({
				focused: false,
				hovered: false,
				pressed: false,
			}),

		blurHandler: NonNullable<BaseProps['onBlur']> =
			useCallback(event => {
				onBlur?.(event)
				setState(state_ => ({
					...state_,
					focused: false,
				}))
			}, [
				onBlur,
			]),

		focusHandler: NonNullable<BaseProps['onFocus']> =
			useCallback(event => {
				onFocus?.(event)
				setState(state_ => ({
					...state_,
					focused: true,
				}))
			}, [
				onFocus,
			]),

		hoverInHandler: NonNullable<BaseProps['onHoverIn']> =
			useCallback(event => {
				onHoverIn?.(event)
				setState(state_ => ({
					...state_,
					hovered: true,
				}))
			}, [
				onHoverIn,
			]),

		hoverOutHandler: NonNullable<BaseProps['onHoverIn']> =
			useCallback(event => {
				onHoverOut?.(event)
				setState(state_ => ({
					...state_,
					hovered: false,
				}))
			}, [
				onHoverOut,
			]),

		pressInHandler: NonNullable<BaseProps['onPressIn']> =
			useCallback(event => {
				onPressIn?.(event)
				setState(state_ => ({
					...state_,
					pressed: true,
				}))
			}, [
				onPressIn,
			]),

		pressOutHandler: NonNullable<BaseProps['onPressOut']> =
			useCallback(event => {
				onPressOut?.(event)
				setState(state_ => ({
					...state_,
					pressed: false,
				}))
			}, [
				onPressOut,
			]),

		stateStyle =
			getStateStyle(
				colorStateStyle,
				{ ...state, disabled: !!disabled },
			)

	return (
		<Base
			{ ...props }
			backgroundNode={
				<View
					style={ [
						styles.innerFocusBox,
						state.focused
							? mapInnerFocusBoxActiveStyle[themeContext.colorScheme]
							: null,
					] }
				/>
			}
			disabled={ disabled }
			onBlur={ blurHandler }
			onFocus={ focusHandler }
			onHoverIn={ hoverInHandler }
			onHoverOut={ hoverOutHandler }
			onPressIn={ pressInHandler }
			onPressOut={ pressOutHandler }
			iconColor={ stateStyle.icon }
			style={ [
				stateStyle.background,
				style,
			] }
			textStyle={ [
				stateStyle.text,
				textStyle,
			] }
		/>
	)

}

const
	styles =
		StyleSheet.create({
			innerFocusBox: {
				position: 'absolute',
				top: 2,
				right: 2,
				bottom: 2,
				left: 2,
				borderWidth: 1,
				borderColor: 'transparent',
			},
			innerFocusBoxActive_GRAY_10: {
				borderColor: ColorConstant.Tokens.GRAY_10.focus_inset,
			},
			innerFocusBoxActive_GRAY_100: {
				borderColor: ColorConstant.Tokens.GRAY_100.focus_inset,
			},
		}),

	mapInnerFocusBoxActiveStyle: Record<ThemeType.ColorScheme, typeof styles['innerFocusBoxActive_GRAY_10']> =
		{
			GRAY_10: styles.innerFocusBoxActive_GRAY_10,
			GRAY_100: styles.innerFocusBoxActive_GRAY_100,
		}

function getStateStyle(
	colorStateStyle: BaseColorProps['colorStateStyle'],
	states: Record<Exclude<BaseColorState, 'default'>, boolean>,
): { background: ViewStyle, text: TextStyle, icon: string } {

	if(!states.hovered && !states.pressed && !states.disabled) {
		return {
			background: colorStateStyle.background.default,
			text: colorStateStyle.text.default,
			icon: colorStateStyle.icon.default,
		}
	}

	if(states.disabled) {
		return {
			background: colorStateStyle.background.disabled,
			text: colorStateStyle.text.disabled,
			icon: colorStateStyle.icon.disabled,
		}
	}

	if(states.pressed) {
		return {
			background: colorStateStyle.background.pressed,
			text: colorStateStyle.text.pressed,
			icon: colorStateStyle.icon.pressed,
		}
	}

	return {
		background: colorStateStyle.background.hovered,
		text: colorStateStyle.text.hovered,
		icon: colorStateStyle.icon.hovered,
	}

}
