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
	PrimaryProps,
} from './PrimaryProps'

import type {
	PrimaryRef,
} from './PrimaryRef'

export const Primary = forwardRef<PrimaryRef, PrimaryProps>(
	function Primary(
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

	},
)

const
	colorStyle =
		StyleSheet.create<
			Record<
				`${'background' | 'text'}_${keyof BaseColorProps['colorStateStyle']['text']}`,
				ViewStyle | TextStyle
			>
		>({
			background_default: {
				backgroundColor: StyleSheet.color.button_primary,
			},
			background_focused: {
				backgroundColor: StyleSheet.color.button_primary,
			},
			background_hovered: {
				backgroundColor: StyleSheet.color.button_primary_hover,
			},
			background_pressed: {
				backgroundColor: StyleSheet.color.button_primary_active,
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
