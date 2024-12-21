import {
	useContext,
} from 'react'

import {
	StyleSheet,
} from 'react-native'

import {
	SpacingConstant,
} from '../../../constants'

import {
	ThemeContext,
} from '../../../contexts'

import {
	BaseColor,
	type BaseColorProps,
} from '../base-color'

export interface GhostDangerProps extends Omit<BaseColorProps, 'colorStateStyle'> {
}

export function GhostDanger({
	text,
	iconStyle,
	...props
}: GhostDangerProps) {

	const
		themeContext =
			useContext(ThemeContext)

	return (
		<BaseColor
			{ ...props }
			text={ text }
			colorStateStyle={{
				background: {
					default: { backgroundColor: 'transparent' },
					focused: {
						borderWidth: 1,
						borderColor: themeContext.color.focus,
					},
					hovered: { backgroundColor: themeContext.color.button_danger_hover },
					pressed: { backgroundColor: themeContext.color.button_danger_active },
					disabled: { backgroundColor: themeContext.color.button_disabled },
				},
				text: {
					default: { color: themeContext.color.button_danger_secondary },
					focused: { color: themeContext.color.button_danger_secondary },
					hovered: { color: themeContext.color.text_on_color },
					pressed: { color: themeContext.color.text_on_color },
					disabled: { color: themeContext.color.text_disabled },
				},
				icon: {
					default: themeContext.color.button_danger_secondary,
					focused: themeContext.color.button_danger_secondary,
					hovered: themeContext.color.icon_on_color,
					pressed: themeContext.color.icon_on_color,
					disabled: themeContext.color.icon_disabled,
				},
			}}
			iconStyle={ [ mapIconPLByText[`${!!text}`], iconStyle ] }
		/>
	)

}

const
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
