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

export interface PrimaryProps extends Omit<
	BaseColorProps,
	| 'android_rippleEffectColor'
	| 'colorStateStyle'
	| 'iconContainerStyle'
> {
}

export function Primary(props: PrimaryProps) {

	const
		themeContext =
			useContext(ThemeContext)

	return (
		<BaseColor
			{ ...props }
			android_rippleEffectColor={ themeContext.color.button_primary_active }
			colorStateStyle={{
				background: {
					default: colorStyle.background_default,
					focused: colorStyle.background_pressed,
					hovered: colorStyle.background_hovered,
					pressed: colorStyle.background_pressed,
					disabled: colorStyle.background_disabled,
				},
				text: {
					default: colorStyle.text_default,
					focused: colorStyle.text_focused,
					hovered: colorStyle.text_hovered,
					pressed: colorStyle.text_pressed,
					disabled: colorStyle.text_disabled,
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
	colorStyle =
		StyleSheet.create<
			Record<
				`${'background' | 'text'}_${keyof BaseColorProps['colorStateStyle']['text']}`,
				ViewStyle | TextStyle
			>
		>(color => ({
			background_default: {
				backgroundColor: color.button_primary,
			},
			background_focused: {
				backgroundColor: color.button_primary,
			},
			background_hovered: {
				backgroundColor: color.button_primary_hover,
			},
			background_pressed: {
				backgroundColor: color.button_primary_active,
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
