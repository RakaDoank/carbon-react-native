import {
	useContext,
} from 'react'

import {
	StyleSheet,
	type TextStyle,
	type ViewStyle,
} from 'react-native'

import {
	ThemeContext,
} from '../../../contexts'

import {
	StyleSheet as StyleSheetColor,
} from '../../../_style-sheet'

import {
	BaseColor,
	type BaseColorProps,
} from '../base-color'

export interface TertiaryDangerProps extends Omit<
	BaseColorProps,
	| 'android_rippleEffectColor'
	| 'colorStateStyle'
	| 'iconContainerStyle'
> {
}

export function TertiaryDanger({
	style,
	...props
}: TertiaryDangerProps) {

	const
		themeContext =
			useContext(ThemeContext)

	return (
		<BaseColor
			{ ...props }
			android_rippleEffectColor={ themeContext.color.button_danger_active }
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
					default: themeContext.color.button_danger_secondary,
					focused: themeContext.color.button_danger_secondary,
					hovered: themeContext.color.icon_on_color,
					pressed: themeContext.color.icon_on_color,
					disabled: themeContext.color.icon_disabled,
				},
			}}
			style={ [baseStyle.tertiaryDanger, style] }
		/>
	)

}

const
	baseStyle =
		StyleSheet.create({
			tertiaryDanger: {
				borderWidth: 1,
			},
		}),

	colorStyle =
		StyleSheetColor.create<
			Record<
				`${'background' | 'text'}_${keyof BaseColorProps['colorStateStyle']['text']}`,
				ViewStyle | TextStyle
			>
		>(color => ({
			background_default: {
				backgroundColor: 'transparent',
				borderColor: color.button_danger_secondary,
			},
			background_focused: {
				backgroundColor: 'transparent',
				borderColor: color.focus,
			},
			background_hovered: {
				backgroundColor: color.button_danger_hover,
				borderColor: color.button_danger_hover,
			},
			background_pressed: {
				backgroundColor: color.button_danger_active,
				borderColor: color.button_danger_active,
			},
			background_disabled: {
				backgroundColor: 'transparent',
				borderColor: color.button_disabled,
			},

			text_default: {
				color: color.button_danger_secondary,
			},
			text_focused: {
				color: color.button_danger_secondary,
			},
			text_hovered: {
				color: color.text_on_color,
			},
			text_pressed: {
				color: color.text_on_color,
			},
			text_disabled: {
				color: color.text_disabled,
			},
		}))
