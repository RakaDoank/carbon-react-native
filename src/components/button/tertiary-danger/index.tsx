import {
	useContext,
} from 'react'

import {
	ThemeContext,
} from '../../../contexts'

import {
	BaseColor,
	type BaseColorProps,
} from '../base-color'

export interface TertiaryDangerProps extends Omit<BaseColorProps, 'colorStateStyle' | 'iconContainerStyle'> {
}

export function TertiaryDanger(props: TertiaryDangerProps) {

	const
		themeContext =
			useContext(ThemeContext)

	return (
		<BaseColor
			{ ...props }
			colorStateStyle={{
				background: {
					default: {
						backgroundColor: 'transparent',
						borderWidth: 1, // Should we use StyleSheet.hairlineWidth here?
						borderColor: themeContext.color.button_danger_secondary,
					},
					focused: {
						backgroundColor: 'transparent',
						borderWidth: 1,
						borderColor: themeContext.color.focus,
					},
					hovered: {
						backgroundColor: themeContext.color.button_danger_hover,
						borderWidth: 1,
						borderColor: themeContext.color.button_danger_hover,
					},
					pressed: {
						backgroundColor: themeContext.color.button_danger_active,
						borderWidth: 1,
						borderColor: themeContext.color.button_danger_active,
					},
					disabled: {
						backgroundColor: 'transparent',
						borderWidth: 1,
						borderColor: themeContext.color.button_disabled,
					},
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
		/>
	)

}
