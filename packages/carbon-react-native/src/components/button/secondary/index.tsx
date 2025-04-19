import {
	useContext,
} from 'react'

import type {
	TextStyle,
	ViewStyle,
} from 'react-native'

import {
	ThemeContext,
} from '../../../contexts'

import {
	StyleSheet,
} from '../../../_style-sheet'

import {
	BaseColor,
	type BaseColorProps,
} from '../base-color'

export interface SecondaryProps extends Omit<
	BaseColorProps,
	| 'android_rippleEffectColor'
	| 'colorStateStyle'
	| 'iconContainerStyle'
> {
}

export function Secondary(props: SecondaryProps) {

	const
		themeContext =
			useContext(ThemeContext)

	return (
		<BaseColor
			{ ...props }
			android_rippleEffectColor={ themeContext.color.button_secondary_active }
			colorStateStyle={{
				background: {
					default: style.background_default,
					focused: style.background_pressed,
					hovered: style.background_hovered,
					pressed: style.background_pressed,
					disabled: style.background_disabled,
				},
				text: {
					default: style.text_default,
					focused: style.text_focused,
					hovered: style.text_hovered,
					pressed: style.text_pressed,
					disabled: style.text_disabled,
				},
				icon: {
					default: themeContext.color.icon_on_color,
					focused: themeContext.color.icon_on_color,
					hovered: themeContext.color.icon_on_color,
					pressed: themeContext.color.icon_on_color,
					disabled: themeContext.color.icon_on_color_disabled,
				},
			}}
		/>
	)

}

const
	style =
		StyleSheet.create<
			Record<
				`${'background' | 'text'}_${keyof BaseColorProps['colorStateStyle']['text']}`,
				ViewStyle | TextStyle
			>
		>({
			background_default: {
				backgroundColor: StyleSheet.color.button_secondary,
			},
			background_focused: {
				backgroundColor: StyleSheet.color.button_secondary,
			},
			background_hovered: {
				backgroundColor: StyleSheet.color.button_secondary_hover,
			},
			background_pressed: {
				backgroundColor: StyleSheet.color.button_secondary_active,
			},
			background_disabled: {
				backgroundColor: StyleSheet.color.button_disabled,
			},

			text_default: {
				color: StyleSheet.color.text_on_color,
			},
			text_focused: {
				color: StyleSheet.color.text_on_color,
			},
			text_hovered: {
				color: StyleSheet.color.text_on_color,
			},
			text_pressed: {
				color: StyleSheet.color.text_on_color,
			},
			text_disabled: {
				color: StyleSheet.color.text_on_color_disabled,
			},
		})
