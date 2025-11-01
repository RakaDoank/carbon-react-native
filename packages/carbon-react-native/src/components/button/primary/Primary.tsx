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
			/>
		)

	},
)

const
	backgroundStyleSheet =
		CarbonStyleSheet.create<
			Record<keyof BaseColorProps['colorStateStyle']['background'], ViewStyle>
		>({
			default: {
				backgroundColor: CarbonStyleSheet.color.button_primary,
			},
			focused: {
				backgroundColor: CarbonStyleSheet.color.button_primary,
			},
			hovered: {
				backgroundColor: CarbonStyleSheet.color.button_primary_hover,
			},
			pressed: {
				backgroundColor: CarbonStyleSheet.color.button_primary_active,
			},
			disabled: {
				backgroundColor: CarbonStyleSheet.color.button_disabled,
			},
		}),

	textStyleSheet =
		CarbonStyleSheet.create<
			Record<keyof BaseColorProps['colorStateStyle']['text'], TextStyle>
		>({
			default: {
				color: CarbonStyleSheet.color.text_on_color,
			},
			focused: {
				color: CarbonStyleSheet.color.text_on_color,
			},
			hovered: {
				color: CarbonStyleSheet.color.text_on_color,
			},
			pressed: {
				color: CarbonStyleSheet.color.text_on_color,
			},
			disabled: {
				color: CarbonStyleSheet.color.text_on_color_disabled,
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
