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
	SecondaryProps,
} from './SecondaryProps'

import type {
	SecondaryRef,
} from './SecondaryRef'

export const Secondary = forwardRef<SecondaryRef, SecondaryProps>(
	function Secondary(
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
					icon: mapIconColor[themeContext.colorScheme],
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
			gray_10: Color.Token.gray_10.button_secondary_active,
			gray_100: Color.Token.gray_100.button_secondary_active,
		}
