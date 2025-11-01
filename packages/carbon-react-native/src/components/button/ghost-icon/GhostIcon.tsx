import {
	forwardRef,
	useContext,
} from 'react'

import {
	StyleSheet,
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
	GhostIconProps,
} from './GhostIconProps'

import type {
	GhostIconRef,
} from './GhostIconRef'

export const GhostIcon = forwardRef<GhostIconRef, GhostIconProps>(
	function GhostIcon(
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
						default: style.text,
						focused: style.text,
						hovered: style.text,
						pressed: style.text,
						disabled: style.text,
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
				backgroundColor: 'transparent',
			},
			focused: {
				borderWidth: 1,
				borderColor: CarbonStyleSheet.color.focus,
			},
			hovered: {
				backgroundColor: CarbonStyleSheet.color.background_hover,
			},
			pressed: {
				backgroundColor: CarbonStyleSheet.color.background_active,
			},
			disabled: {
				backgroundColor: 'transparent',
			},
		}),

	style =
		StyleSheet.create({
			text: {
				color: 'transparent',
			},
		}),

	mapIconColor: Record<ThemeContext['colorScheme'], Record<BaseColorState, string>> =
		{
			gray_10: {
				default: Color.Token.gray_10.icon_primary,
				focused: Color.Token.gray_10.icon_primary,
				hovered: Color.Token.gray_10.icon_primary,
				pressed: Color.Token.gray_10.icon_primary,
				disabled: Color.Token.gray_10.icon_disabled,
			},
			gray_100: {
				default: Color.Token.gray_100.icon_primary,
				focused: Color.Token.gray_100.icon_primary,
				hovered: Color.Token.gray_100.icon_primary,
				pressed: Color.Token.gray_100.icon_primary,
				disabled: Color.Token.gray_100.icon_disabled,
			},
		},

	mapAndroidRippleEffectColor: Record<ThemeContext['colorScheme'], string> =
		{
			gray_10: Color.Token.gray_10.background_active,
			gray_100: Color.Token.gray_100.background_active,
		}
