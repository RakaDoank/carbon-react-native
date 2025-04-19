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
	StyleSheet as CarbonStyleSheet,
} from '../../../_style-sheet'

import {
	BaseColor,
	type BaseColorProps,
} from '../base-color'

export interface TertiaryProps extends Omit<
	BaseColorProps,
	| 'android_rippleEffectColor'
	| 'colorStateStyle'
	| 'iconContainerStyle'
> {
}

export function Tertiary({
	style,
	...props
}: TertiaryProps) {

	const
		themeContext =
			useContext(ThemeContext)

	return (
		<BaseColor
			{ ...props }
			android_rippleEffectColor={ themeContext.color.button_tertiary_active }
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
					default: themeContext.color.button_tertiary,
					focused: themeContext.color.button_tertiary,
					hovered: themeContext.color.icon_inverse,
					pressed: themeContext.color.icon_inverse,
					disabled: themeContext.color.icon_disabled,
				},
			}}
			style={ [baseStyle.tertiary, style] }
		/>
	)

}

const
	baseStyle =
		StyleSheet.create({
			tertiary: {
				borderWidth: 1,
			},
		}),

	colorStyle =
		CarbonStyleSheet.create<
			Record<
				`${'background' | 'text'}_${keyof BaseColorProps['colorStateStyle']['text']}`,
				ViewStyle | TextStyle
			>
		>({
			background_default: {
				backgroundColor: 'transparent',
				borderColor: CarbonStyleSheet.color.button_tertiary,
			},
			background_focused: {
				backgroundColor: CarbonStyleSheet.color.button_tertiary_hover,
				borderColor: CarbonStyleSheet.color.focus,
			},
			background_hovered: {
				backgroundColor: CarbonStyleSheet.color.button_tertiary_hover,
				borderColor: CarbonStyleSheet.color.button_tertiary_hover,
			},
			background_pressed: {
				backgroundColor: CarbonStyleSheet.color.button_tertiary_active,
				borderColor: CarbonStyleSheet.color.button_tertiary_active,
			},
			background_disabled: {
				backgroundColor: 'transparent',
				borderColor: CarbonStyleSheet.color.button_disabled,
			},

			text_default: {
				color: CarbonStyleSheet.color.button_tertiary,
			},
			text_focused: {
				color: CarbonStyleSheet.color.button_tertiary,
			},
			text_hovered: {
				color: CarbonStyleSheet.color.text_inverse,
			},
			text_pressed: {
				color: CarbonStyleSheet.color.text_inverse,
			},
			text_disabled: {
				color: CarbonStyleSheet.color.text_disabled,
			},
		})
