import {
	useContext,
} from 'react'

import {
	View,
} from 'react-native'

import ChevronDown from '@carbon/icons/es/chevron--down/16'

import {
	ThemeContext,
} from '../../contexts'

import {
	FlexStyle,
} from '../../styles'

import {
	BaseColor as ButtonColor,
	type BaseColorProps as ButtonColorProps,
} from '../button/base-color'
import {
	Size as ButtonSize,
} from '../button/size'

import {
	AccordionHeaderBorder,
} from './header-border'
import {
	Size,
} from './size'

export interface AccordionHeaderProps extends Omit<ButtonColorProps, 'size' | 'text' | 'colorStateStyle'> {
	size?: Size,
	/**
	 * https://carbondesignsystem.com/components/accordion/style/#flush-alignment
	 */
	flushAlignment?: boolean,
	text?: string,
}

export function AccordionHeader({
	size = Size.MEDIUM,
	flushAlignment = false,
	text,
	style: styleProp,
	...buttonProps
}: AccordionHeaderProps) {

	const themeContext = useContext(ThemeContext)

	return (
		<View
			style={ styleProp }
		>
			{ /** The Border Box */}
			<AccordionHeaderBorder
				flushAlignment={ flushAlignment }
			/>

			<ButtonColor
				{ ...buttonProps }
				size={ mapSizeToButtonSize[size] }
				text={ text }
				icon={ ChevronDown }
				colorStateStyle={{
					background: {
						default: { backgroundColor: 'transparent' },
						focused: {
							backgroundColor: 'transparent',
							borderWidth: 1,
							borderColor: themeContext.color.focus,
						},
						/**
						 * it is said $layer-hover  
						 * https://carbondesignsystem.com/components/accordion/style/#interactive-states  
						 * But, i can't find the layer color token  
						 * https://carbondesignsystem.com/elements/color/tokens/#layer
						 */
						hovered: { backgroundColor: themeContext.color.layer_hover_01 },
						pressed: { backgroundColor: themeContext.color.layer_hover_01 },
						disabled: { backgroundColor: 'transparent' },
					},
					text: {
						default: { color: themeContext.color.text_primary },
						focused: { color: themeContext.color.text_primary },
						hovered: { color: themeContext.color.text_primary },
						pressed: { color: themeContext.color.text_primary },
						disabled: { color: themeContext.color.text_disabled },
					},
					icon: {
						default: themeContext.color.icon_primary,
						focused: themeContext.color.icon_primary,
						hovered: themeContext.color.icon_primary,
						pressed: themeContext.color.icon_primary,
						disabled: themeContext.color.icon_disabled,
					},
				}}
				style={ FlexStyle.self_stretch }
			/>
		</View>
	)

}

const
	/**
	 * Coincidentally (or not) use same value of height  
	 * https://carbondesignsystem.com/components/accordion/style/#sizes
	 */
	mapSizeToButtonSize: Record<Size, ButtonSize> =
		{
			[Size.SMALL]: ButtonSize.SMALL,
			[Size.MEDIUM]: ButtonSize.MEDIUM,
			[Size.LARGE]: ButtonSize.LARGE_PRODUCTIVE,
		}
