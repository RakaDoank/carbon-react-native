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
	GhostIconProps,
} from './GhostIconProps'

import type {
	GhostIconRef,
} from './GhostIconRef'

export const GhostIcon = forwardRef<GhostIconRef, GhostIconProps>(
	function GhostIcon(
		{
			selected,
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
				android_rippleEffectColor={ themeContext.color.background_active }
				colorStateStyle={{
					background: {
						default: selected
							? style.background_default
							: style.background_default_selected,
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
					icon: {
						default: themeContext.color.icon_primary,
						focused: themeContext.color.icon_primary,
						hovered: themeContext.color.icon_primary,
						pressed: themeContext.color.icon_primary,
						disabled: themeContext.color.icon_disabled,
					},
				}}
			/>
		)

	},
)

const
	style =
		StyleSheet.create<
			Record<
				| `${'background' | 'text'}_${keyof BaseColorProps['colorStateStyle']['text']}`
				| 'background_default_selected',
				ViewStyle | TextStyle
			>
		>({
			background_default: {
				backgroundColor: 'transparent',
			},
			background_default_selected: {
				backgroundColor: StyleSheet.color.background_selected,
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
		})
