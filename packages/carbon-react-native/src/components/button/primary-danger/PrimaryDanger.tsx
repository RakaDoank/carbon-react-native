import {
	forwardRef,
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

import type {
	PrimaryDangerProps,
} from './PrimaryDangerProps'

import type {
	PrimaryDangerRef,
} from './PrimaryDangerRef'

export const PrimaryDanger = forwardRef<PrimaryDangerRef, PrimaryDangerProps>(
	function PrimaryDanger(
		props,
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

	},
)

const
	style =
		StyleSheet.create<
			Record<
				`${'background' | 'text'}_${keyof BaseColorProps['colorStateStyle']['text']}`,
				ViewStyle | TextStyle
			>
		>({
			background_default: {
				backgroundColor: StyleSheet.color.button_danger_primary,
			},
			background_focused: {
				backgroundColor: StyleSheet.color.button_danger_primary,
			},
			background_hovered: {
				backgroundColor: StyleSheet.color.button_danger_hover,
			},
			background_pressed: {
				backgroundColor: StyleSheet.color.button_danger_active,
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
