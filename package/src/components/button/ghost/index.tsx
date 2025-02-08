import {
	useContext,
} from 'react'

import {
	StyleSheet,
	type TextStyle,
	type ViewStyle,
} from 'react-native'

import {
	SpacingConstant,
} from '../../../constants'

import {
	ThemeContext,
} from '../../../contexts'

import {
	StyleSheet as StyleSheetColor,
} from '../../../_style-sheet'

import {
	BaseColor,
	type BaseColorProps,
} from '../base-color'

export interface GhostProps extends Omit<
	BaseColorProps,
	| 'android_rippleEffectColor'
	| 'colorStateStyle'
> {
}

export function Ghost({
	text,
	iconStyle,
	...props
}: GhostProps) {

	const
		themeContext =
			useContext(ThemeContext)

	return (
		<BaseColor
			{ ...props }
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

}

const
	colorStyle =
		StyleSheetColor.create<
			Record<
				`${'background' | 'text'}_${keyof BaseColorProps['colorStateStyle']['text']}`,
				ViewStyle | TextStyle
			>
		>(color => ({
			background_default: {
				backgroundColor: 'transparent',
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
				color: color.link_primary,
			},
			text_focused: {
				color: color.link_primary,
			},
			text_hovered: {
				color: color.link_primary_hover,
			},
			text_pressed: {
				color: color.link_primary,
			},
			text_disabled: {
				color: color.text_disabled,
			},
		})),

	style =
		StyleSheet.create({
			iconPL8: {
				paddingLeft: SpacingConstant.spacing_03,
			},
		}),

	mapIconPLByText: Record<string, typeof style['iconPL8'] | null> =
		{
			false: null,
			true: style.iconPL8,
		}
