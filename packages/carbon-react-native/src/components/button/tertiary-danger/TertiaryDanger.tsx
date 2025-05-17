import {
	forwardRef,
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

import type {
	TertiaryDangerProps,
} from './TertiaryDangerProps'

import type {
	TertiaryDangerRef,
} from './TertiaryDangerRef'

export const TertiaryDanger = forwardRef<TertiaryDangerRef, TertiaryDangerProps>(
	function TertiaryDanger(
		{
			style,
			...props
		},
		ref,
	) {

		const
			themeContext =
				useContext(ThemeContext)

		return (
			<BaseColor
				{ ...props }
				ref={ ref }
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

	},
)

const
	baseStyle =
		StyleSheet.create({
			tertiaryDanger: {
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
				borderColor: CarbonStyleSheet.color.button_danger_secondary,
			},
			background_focused: {
				backgroundColor: 'transparent',
				borderColor: CarbonStyleSheet.color.focus,
			},
			background_hovered: {
				backgroundColor: CarbonStyleSheet.color.button_danger_hover,
				borderColor: CarbonStyleSheet.color.button_danger_hover,
			},
			background_pressed: {
				backgroundColor: CarbonStyleSheet.color.button_danger_active,
				borderColor: CarbonStyleSheet.color.button_danger_active,
			},
			background_disabled: {
				backgroundColor: 'transparent',
				borderColor: CarbonStyleSheet.color.button_disabled,
			},

			text_default: {
				color: CarbonStyleSheet.color.button_danger_secondary,
			},
			text_focused: {
				color: CarbonStyleSheet.color.button_danger_secondary,
			},
			text_hovered: {
				color: CarbonStyleSheet.color.text_on_color,
			},
			text_pressed: {
				color: CarbonStyleSheet.color.text_on_color,
			},
			text_disabled: {
				color: CarbonStyleSheet.color.text_disabled,
			},
		})
