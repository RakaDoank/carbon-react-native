import {
	useContext,
} from 'react'

import {
	ThemeContext,
} from '../../../contexts'

import type {
	ThemeType,
} from '../../../types'

import type {
	BaseProps,
} from '../base'

import type {
	NotificationColor,
} from '../types'

type ColorModifier = Record<NotificationColor, ThemeType.ColorToken>

export interface UseBaseProps {
	color?: NotificationColor,
	backgroundColor: ColorModifier,
	borderColor: ColorModifier,
	leftBarColor: ColorModifier,
	iconColor: ColorModifier,
	iconCloseColor: ColorModifier,
	titleColor: ColorModifier,
	/**
	 * true to use background color for top-right-bottom border.  
	 * Currently for actionable variant
	 */
	transparentBorderColor?: boolean,
}

export interface UseBaseData {
	iconProps: BaseProps['iconProps'],
	iconCloseProps: BaseProps['iconCloseProps'],
	titleStyle: BaseProps['titleStyle'],
	leftBarStyle: BaseProps['leftBarStyle'],
	style: BaseProps['style'],
}

export function useBase({
	color = 'high_contrast',
	backgroundColor,
	borderColor,
	leftBarColor,
	iconColor,
	iconCloseColor,
	titleColor,
	transparentBorderColor,
}: UseBaseProps): UseBaseData {

	const
		themeContext =
			useContext(ThemeContext),

		borderColorStr =
			themeContext.color[borderColor[color]],

		backgroundColorStr =
			themeContext.color[backgroundColor[color]]

	return {
		titleStyle: {
			color: themeContext.color[titleColor[color]],
		},
		iconProps: {
			color: themeContext.color[iconColor[color]],
		},
		iconCloseProps: {
			color: themeContext.color[iconCloseColor[color]],
		},
		leftBarStyle: {
			backgroundColor: themeContext.color[leftBarColor[color]],
		},
		style: {
			backgroundColor: backgroundColorStr,
			borderTopWidth: 1,
			borderRightWidth: 1,
			borderBottomWidth: 1,
			...(!transparentBorderColor ? {
				borderTopColor: borderColorStr,
				borderRightColor: borderColorStr,
				borderBottomColor: borderColorStr,
			} : {
				borderTopColor: backgroundColorStr,
				borderRightColor: backgroundColorStr,
				borderBottomColor: backgroundColorStr,
			}),
		},
	}

}
