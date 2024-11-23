import {
	useContext,
} from 'react'

import {
	ThemeContext,
} from '../../../contexts'

import type {
	SharedType,
} from '../../../types'

import {
	BaseColor,
	type BaseColorProps,
} from '../base-color'

export interface GhostIconProps extends Omit<BaseColorProps, 'colorStateStyle' | 'icon' | 'iconContainerStyle' | 'text'> {
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
			colorStateStyle={{
				background: {
					default: {
						backgroundColor: selected
							? themeContext.color.background_selected
							: 'transparent',
					},
					focused: {
						borderWidth: 1,
						borderColor: themeContext.color.focus,
					},
					hovered: { backgroundColor: themeContext.color.background_hover },
					pressed: { backgroundColor: themeContext.color.background_active },
					disabled: { backgroundColor: 'transparent' },
				},
				text: {
					default: { color: 'transparent' },
					focused: { color: 'transparent' },
					hovered: { color: 'transparent' },
					pressed: { color: 'transparent' },
					disabled: { color: 'transparent' },
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
