import {
	forwardRef,
	useContext,
} from 'react'

import type {
	TextStyle,
	ViewStyle,
} from 'react-native'

import {
	Color,
} from '@audira/carbon-react-native-elements'

import {
	ThemeContext,
} from '../../../contexts'

import {
	StyleSheet,
} from '../../../_style-sheet'

import {
	BaseColor,
	type BaseColorProps,
	type BaseColorState,
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
				android_rippleEffectColor={ mapAndroidRippleEffectColor[themeContext.colorScheme] }
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
					icon: mapIconColor[themeContext.colorScheme],
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
		}),

	mapIconColor: Record<ThemeContext['colorScheme'], Record<BaseColorState, string>> =
		{
			gray_10: {
				default: Color.Token.gray_10.icon_on_color,
				focused: Color.Token.gray_10.icon_on_color,
				hovered: Color.Token.gray_10.icon_on_color,
				pressed: Color.Token.gray_10.icon_on_color,
				disabled: Color.Token.gray_10.icon_on_color_disabled,
			},
			gray_100: {
				default: Color.Token.gray_100.icon_on_color,
				focused: Color.Token.gray_100.icon_on_color,
				hovered: Color.Token.gray_100.icon_on_color,
				pressed: Color.Token.gray_100.icon_on_color,
				disabled: Color.Token.gray_100.icon_on_color_disabled,
			},
		},

	mapAndroidRippleEffectColor: Record<ThemeContext['colorScheme'], string> =
		{
			gray_10: Color.Token.gray_10.button_primary_active,
			gray_100: Color.Token.gray_100.button_primary_active,
		}
