import {
	forwardRef,
	useContext,
	useCallback,
	useState,
} from 'react'

import {
	Platform,
	StyleSheet,
	View,
	type StyleProp,
	type TextStyle,
	type ViewStyle,
} from 'react-native'

import {
	Color,
} from '@audira/carbon-react-native-elements'

import {
	GlobalConfigContext,
} from '../../../_internal/contexts'

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

import type {
	BaseColorProps,
} from './BaseColorProps'

import type {
	BaseColorRef,
} from './BaseColorRef'

import type {
	BaseColorState,
} from './BaseColorState'

export const BaseColor = forwardRef<BaseColorRef, BaseColorProps>(
	function BaseColor(
		{
			disabled,
			style,
			textStyle,
			android_rippleEffectColor,
			colorStateStyle,
			icon,
			iconNode,
			onBlur,
			onFocus,
			onHoverIn,
			onHoverOut,
			onPressIn,
			onPressOut,
			android_ripple,
			...props
		},
		ref,
	) {

		const
			globalConfigContext =
				useContext(GlobalConfigContext),

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
					{
						...state,
						disabled: !!disabled,
					},
					android_ripple
						? true
						: android_ripple === null ? false : globalConfigContext.android_buttonRippleEffect,
				)

		return (
			<Base
				{ ...props }
				ref={ ref }
				android_ripple={ android_ripple ?? globalConfigContext.android_buttonRippleEffect ? {
					// color: colorStateStyle.background.pressed.backgroundColor,
					color: android_rippleEffectColor,
				} : undefined }
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
				icon={ !iconNode ? icon : undefined }
				iconNode={
					iconNode
						? (...params) => iconNode(stateStyle.icon, ...params)
						: undefined
				}
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

	},
)

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
				borderColor: Color.Token.gray_10.focus_inset,
			},
			innerFocusBoxActive_GRAY_100: {
				borderColor: Color.Token.gray_100.focus_inset,
			},
		}),

	mapInnerFocusBoxActiveStyle: Record<ThemeType.ColorScheme, typeof styles['innerFocusBoxActive_GRAY_10']> =
		{
			gray_10: styles.innerFocusBoxActive_GRAY_10,
			gray_100: styles.innerFocusBoxActive_GRAY_100,
		}

function getStateStyle(
	colorStateStyle: BaseColorProps['colorStateStyle'],
	states: Record<Exclude<BaseColorState, 'default'>, boolean>,
	androidRipple?: boolean,
): { background: StyleProp<ViewStyle>, text: StyleProp<TextStyle>, icon: string } {

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
			background: androidRipple && Platform.OS == 'android'
				? colorStateStyle.background.default
				: colorStateStyle.background.pressed,
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
