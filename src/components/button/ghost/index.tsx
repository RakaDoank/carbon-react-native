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

export interface GhostProps extends Omit<BaseColorProps, 'colorStateStyle' | 'iconContainerStyle'> {
}

export function Ghost({
	text,
	...props
}: GhostProps) {

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
					hovered: { backgroundColor: themeContext.color.background_hover },
					pressed: { backgroundColor: themeContext.color.background_active },
					disabled: { backgroundColor: 'transparent' },
				},
				text: {
					default: { color: themeContext.color.link_primary },
					focused: { color: themeContext.color.link_primary },
					hovered: { color: themeContext.color.link_primary_hover },
					pressed: { color: themeContext.color.link_primary },
					disabled: { color: themeContext.color.text_disabled },
				},
				icon: {
					default: themeContext.color.link_primary,
					focused: themeContext.color.link_primary,
					hovered: themeContext.color.link_primary_hover,
					pressed: themeContext.color.link_primary,
					disabled: themeContext.color.icon_disabled,
				},
			}}
			iconContainerStyle={ mapIconContainerPLByText[`${!!text}`] }
		/>
	)

}

const
	style =
		StyleSheet.create({
			iconContainerPL8: {
				paddingLeft: SpacingConstant.spacing_03,
			},
		}),

	mapIconContainerPLByText: Record<string, typeof style['iconContainerPL8'] | null> =
		{
			false: null,
			true: style.iconContainerPL8,
		}
