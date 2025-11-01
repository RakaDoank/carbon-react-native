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
				android_rippleEffectColor={ mapAndroidRippleEffectColor[themeContext.colorScheme] }
				colorStateStyle={{
					background: {
						default: backgroundStyleSheet.default,
						focused: backgroundStyleSheet.focused,
						hovered: backgroundStyleSheet.hovered,
						pressed: backgroundStyleSheet.pressed,
						disabled: backgroundStyleSheet.disabled,
					},
					text: {
						default: textStyleSheet.default,
						focused: textStyleSheet.focused,
						hovered: textStyleSheet.hovered,
						pressed: textStyleSheet.pressed,
						disabled: textStyleSheet.disabled,
					},
					icon: mapIconColor[themeContext.colorScheme],
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

	backgroundStyleSheet =
		CarbonStyleSheet.create<
			Record<keyof BaseColorProps['colorStateStyle']['background'], ViewStyle>
		>({
			default: {
				backgroundColor: 'transparent',
				borderColor: CarbonStyleSheet.color.button_danger_secondary,
			},
			focused: {
				backgroundColor: 'transparent',
				borderColor: CarbonStyleSheet.color.focus,
			},
			hovered: {
				backgroundColor: CarbonStyleSheet.color.button_danger_hover,
				borderColor: CarbonStyleSheet.color.button_danger_hover,
			},
			pressed: {
				backgroundColor: CarbonStyleSheet.color.button_danger_active,
				borderColor: CarbonStyleSheet.color.button_danger_active,
			},
			disabled: {
				backgroundColor: 'transparent',
				borderColor: CarbonStyleSheet.color.button_disabled,
			},
		}),

	textStyleSheet =
		CarbonStyleSheet.create<
			Record<keyof BaseColorProps['colorStateStyle']['text'], TextStyle>
		>({
			default: {
				color: CarbonStyleSheet.color.button_danger_secondary,
			},
			focused: {
				color: CarbonStyleSheet.color.button_danger_secondary,
			},
			hovered: {
				color: CarbonStyleSheet.color.text_on_color,
			},
			pressed: {
				color: CarbonStyleSheet.color.text_on_color,
			},
			disabled: {
				color: CarbonStyleSheet.color.text_disabled,
			},
		}),

	mapIconColor: Record<ThemeContext['colorScheme'], Record<BaseColorState, string>> =
		{
			gray_10: {
				default: Color.Token.gray_10.button_danger_secondary,
				focused: Color.Token.gray_10.button_danger_secondary,
				hovered: Color.Token.gray_10.icon_on_color,
				pressed: Color.Token.gray_10.icon_on_color,
				disabled: Color.Token.gray_10.icon_disabled,
			},
			gray_100: {
				default: Color.Token.gray_100.button_danger_secondary,
				focused: Color.Token.gray_100.button_danger_secondary,
				hovered: Color.Token.gray_100.icon_on_color,
				pressed: Color.Token.gray_100.icon_on_color,
				disabled: Color.Token.gray_100.icon_disabled,
			},
		},

	mapAndroidRippleEffectColor: Record<ThemeContext['colorScheme'], string> =
		{
			gray_10: Color.Token.gray_10.button_danger_active,
			gray_100: Color.Token.gray_100.button_danger_active,
		}
