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

export interface PrimaryDangerProps extends Omit<
	BaseColorProps,
	| 'android_rippleEffectColor'
	| 'colorStateStyle'
	| 'iconContainerStyle'
> {
}

export function PrimaryDanger(props: PrimaryDangerProps) {

	const
		themeContext =
			useContext(ThemeContext)

	return (
		<BaseColor
			{ ...props }
			android_rippleEffectColor={ themeContext.color.button_danger_active }
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
		>(color => ({
			background_default: {
				backgroundColor: color.button_danger_primary,
			},
			background_focused: {
				backgroundColor: color.button_danger_primary,
			},
			background_hovered: {
				backgroundColor: color.button_danger_hover,
			},
			background_pressed: {
				backgroundColor: color.button_danger_active,
			},
			background_disabled: {
				backgroundColor: color.button_disabled,
			},

			text_default: {
				color: color.text_on_color,
			},
			text_focused: {
				color: color.text_on_color,
			},
			text_hovered: {
				color: color.text_on_color,
			},
			text_pressed: {
				color: color.text_on_color,
			},
			text_disabled: {
				color: color.text_on_color_disabled,
			},
		}))
