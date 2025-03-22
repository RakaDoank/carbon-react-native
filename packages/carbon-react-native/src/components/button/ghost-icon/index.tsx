import {
	useContext,
} from 'react'

import type {
	TextStyle,
	ViewStyle,
} from 'react-native'

import {
	ThemeContext,
} from '../../../contexts'

import type {
	SharedType,
} from '../../../types'

import {
	StyleSheet,
} from '../../../_style-sheet'

import {
	BaseColor,
	type BaseColorProps,
} from '../base-color'

export interface GhostIconProps extends Omit<
	BaseColorProps,
	| 'android_rippleEffectColor'
	| 'colorStateStyle'
	| 'icon'
	| 'text'
> {
	icon: SharedType.CarbonIcon,
	selected?: boolean,
}

export function GhostIcon({
	selected,
	...props
}: GhostIconProps) {

	const
		themeContext =
			useContext(ThemeContext)

	return (
		<BaseColor
			{ ...props }
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

}

const
	style =
		StyleSheet.create<
			Record<
				| `${'background' | 'text'}_${keyof BaseColorProps['colorStateStyle']['text']}`
				| 'background_default_selected',
				ViewStyle | TextStyle
			>
		>(color => ({
			background_default: {
				backgroundColor: 'transparent',
			},
			background_default_selected: {
				backgroundColor: color.background_selected,
			},
			background_focused: {
				borderWidth: 1,
				borderColor: color.focus,
			},
			background_hovered: {
				backgroundColor: color.background_hover,
			},
			background_pressed: {
				backgroundColor: color.background_active,
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
		}))
