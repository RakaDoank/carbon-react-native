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
						default: style.background_default,
						focused: style.background_focused,
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
		CarbonStyleSheet.create<
			Record<
				| `${'background' | 'text'}_${keyof BaseColorProps['colorStateStyle']['text']}`,
				ViewStyle | TextStyle
			>
		>({
			background_default: {
				backgroundColor: 'transparent',
			},
			background_focused: {
				borderWidth: 1,
				borderColor: CarbonStyleSheet.color.focus,
			},
			background_hovered: {
				backgroundColor: CarbonStyleSheet.color.background_hover,
			},
			background_pressed: {
				backgroundColor: CarbonStyleSheet.color.background_active,
			},
			background_disabled: {
				backgroundColor: 'transparent',
			},

			text_default: {
				color: 'transparent',
			},
			text_focused: {
				color: 'transparent',
			},
			text_hovered: {
				color: 'transparent',
			},
			text_pressed: {
				color: 'transparent',
			},
			text_disabled: {
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
