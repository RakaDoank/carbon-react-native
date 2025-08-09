import {
	forwardRef,
	useContext,
} from 'react'

import {
	StyleSheet as RNStyleSheet,
	type TextStyle,
	type ViewStyle,
} from 'react-native'

import {
	Color,
	Spacing,
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
	GhostProps,
} from './GhostProps'

import type {
	GhostRef,
} from './GhostRef'

export const Ghost = forwardRef<GhostRef, GhostProps>(
	function Ghost(
		{
			text,
			iconStyle,
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
				text={ text }
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
				iconStyle={ [ mapIconPLByText[`${!!text}`], iconStyle ] }
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
				backgroundColor: 'transparent',
			},
			background_focused: {
				borderWidth: 1,
				borderColor: StyleSheet.color.focus,
			},
			background_hovered: {
				backgroundColor: StyleSheet.color.background_hover,
			},
			background_pressed: {
				backgroundColor: StyleSheet.color.background_active,
			},
			background_disabled: {
				backgroundColor: 'transparent',
			},

			text_default: {
				color: StyleSheet.color.link_primary,
			},
			text_focused: {
				color: StyleSheet.color.link_primary,
			},
			text_hovered: {
				color: StyleSheet.color.link_primary_hover,
			},
			text_pressed: {
				color: StyleSheet.color.link_primary,
			},
			text_disabled: {
				color: StyleSheet.color.text_disabled,
			},
		}),

	style =
		RNStyleSheet.create({
			iconPL8: {
				paddingLeft: Spacing.spacing_03,
			},
		}),

	mapIconPLByText: Record<string, typeof style['iconPL8'] | null> =
		{
			false: null,
			true: style.iconPL8,
		},

	mapIconColor: Record<ThemeContext['colorScheme'], Record<BaseColorState, string>> =
		{
			gray_10: {
				default: Color.Token.gray_10.link_primary,
				focused: Color.Token.gray_10.link_primary,
				hovered: Color.Token.gray_10.link_primary_hover,
				pressed: Color.Token.gray_10.link_primary,
				disabled: Color.Token.gray_10.icon_disabled,
			},
			gray_100: {
				default: Color.Token.gray_100.link_primary,
				focused: Color.Token.gray_100.link_primary,
				hovered: Color.Token.gray_100.link_primary_hover,
				pressed: Color.Token.gray_100.link_primary,
				disabled: Color.Token.gray_100.icon_disabled,
			},
		},

	mapAndroidRippleEffectColor: Record<ThemeContext['colorScheme'], string> =
		{
			gray_10: Color.Token.gray_10.background_active,
			gray_100: Color.Token.gray_100.background_active,
		}
