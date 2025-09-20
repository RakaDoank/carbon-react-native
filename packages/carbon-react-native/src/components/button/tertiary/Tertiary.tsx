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
	Color,
} from '@audira/carbon-react-native-elements'

import {
	CarbonStyleSheet,
} from '../../../carbon-style-sheet'
import {
	ThemeContext,
} from '../../../contexts'


import {
	BaseColor,
	type BaseColorProps,
	type BaseColorState,
} from '../base-color'

import type {
	TertiaryProps,
} from './TertiaryProps'

import type {
	TertiaryRef,
} from './TertiaryRef'

export const Tertiary = forwardRef<TertiaryRef, TertiaryProps>(
	function Tertiary(
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
				android_rippleEffectColor={ mapAndroidRippleEffectColor[themeContext.colorScheme] }
				colorStateStyle={{
					background: {
						default: colorStyle.background_default,
						focused: colorStyle.background_focused,
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
				style={ [baseStyle.tertiary, style] }
			/>
		)

	},
)

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
		}),

	mapIconColor: Record<ThemeContext['colorScheme'], Record<BaseColorState, string>> =
		{
			gray_10: {
				default: Color.Token.gray_10.button_tertiary,
				focused: Color.Token.gray_10.button_tertiary,
				hovered: Color.Token.gray_10.icon_inverse,
				pressed: Color.Token.gray_10.icon_inverse,
				disabled: Color.Token.gray_10.icon_disabled,
			},
			gray_100: {
				default: Color.Token.gray_100.button_tertiary,
				focused: Color.Token.gray_100.button_tertiary,
				hovered: Color.Token.gray_100.icon_inverse,
				pressed: Color.Token.gray_100.icon_inverse,
				disabled: Color.Token.gray_100.icon_disabled,
			},
		},

	mapAndroidRippleEffectColor: Record<ThemeContext['colorScheme'], string> =
		{
			gray_10: Color.Token.gray_10.button_tertiary_active,
			gray_100: Color.Token.gray_100.button_tertiary_active,
		}
