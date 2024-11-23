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

export interface TertiaryProps extends Omit<BaseColorProps, 'colorStateStyle' | 'iconContainerStyle'> {
}

export function Tertiary(props: TertiaryProps) {

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
						borderColor: themeContext.color.button_tertiary,
					},
					focused: {
						backgroundColor: themeContext.color.button_tertiary_hover,
						borderWidth: 1,
						borderColor: themeContext.color.focus,
					},
					hovered: {
						backgroundColor: themeContext.color.button_tertiary_hover,
						borderWidth: 1,
						borderColor: themeContext.color.button_tertiary_hover,
					},
					pressed: {
						backgroundColor: themeContext.color.button_tertiary_active,
						borderWidth: 1,
						borderColor: themeContext.color.button_tertiary_active,
					},
					disabled: {
						backgroundColor: 'transparent',
						borderWidth: 1,
						borderColor: themeContext.color.button_disabled,
					},
				},
				text: {
					default: { color: themeContext.color.button_tertiary },
					focused: { color: themeContext.color.button_tertiary },
					hovered: { color: themeContext.color.text_inverse },
					pressed: { color: themeContext.color.text_inverse },
					disabled: { color: themeContext.color.text_disabled },
				},
				icon: {
					default: themeContext.color.button_tertiary,
					focused: themeContext.color.button_tertiary,
					hovered: themeContext.color.icon_inverse,
					pressed: themeContext.color.icon_inverse,
					disabled: themeContext.color.icon_disabled,
				},
			}}
		/>
	)

}
