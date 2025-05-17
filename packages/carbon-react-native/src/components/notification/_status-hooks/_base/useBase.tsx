import {
	useContext,
} from 'react'

import {
	GlobalConfigContext,
	ThemeContext,
} from '../../../../contexts'

import type {
	UseBaseData,
} from './UseBaseData'

import type {
	UseBaseProps,
} from './UseBaseProps'

export function useBase({
	color: colorProp,
	backgroundColor,
	borderColor,
	leftBarColor,
	iconColor,
	iconCloseColor,
	titleColor,
	transparentBorderColor,
}: UseBaseProps): UseBaseData {

	const
		globalConfigContext =
			useContext(GlobalConfigContext),

		color =
			colorProp || globalConfigContext.notificationColor,

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
