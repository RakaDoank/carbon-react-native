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

export interface SecondaryProps extends Omit<BaseColorProps, 'colorStateStyle' | 'iconContainerStyle'> {
}

export function Secondary(props: SecondaryProps) {

	const
		themeContext =
			useContext(ThemeContext)

	return (
		<BaseColor
			{ ...props }
			colorStateStyle={{
				background: {
					default: { backgroundColor: themeContext.color.button_secondary },
					focused: { backgroundColor: themeContext.color.button_secondary },
					hovered: { backgroundColor: themeContext.color.button_secondary_hover },
					pressed: { backgroundColor: themeContext.color.button_secondary_active },
					disabled: { backgroundColor: themeContext.color.button_disabled },
				},
				text: {
					default: { color: themeContext.color.text_on_color },
					focused: { color: themeContext.color.text_on_color },
					hovered: { color: themeContext.color.text_on_color },
					pressed: { color: themeContext.color.text_on_color },
					disabled: { color: themeContext.color.text_on_color_disabled },
				},
				icon: {
					default: themeContext.color.icon_on_color,
					focused: themeContext.color.icon_on_color,
					hovered: themeContext.color.icon_on_color,
					pressed: themeContext.color.icon_on_color,
					disabled: themeContext.color.icon_on_color_disabled,
				},
			}}
		/>
	)

}
