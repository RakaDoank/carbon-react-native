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
				android_rippleEffectColor={ themeContext.color.background_active }
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
						default: themeContext.color.link_primary,
						focused: themeContext.color.link_primary,
						hovered: themeContext.color.link_primary_hover,
						pressed: themeContext.color.link_primary,
						disabled: themeContext.color.icon_disabled,
					},
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
		}
