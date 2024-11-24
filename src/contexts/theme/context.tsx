import {
	createContext,
} from 'react'

import {
	ColorHelper,
} from '../../helpers'

import type {
	GRAY_10,
} from '../../constants/color/tokens'

import type {
	ThemeType,
} from '../../types'

export interface ThemeContextInterface {
	colorScheme: ThemeType.ColorScheme,
	/**
	 * TODO should define strictly, instead of this below
	 */
	color: typeof GRAY_10,
}

const
	colorScheme =
		ColorHelper.getColorScheme()

export const ThemeContext =
	createContext<ThemeContextInterface>({
		colorScheme,
		color: ColorHelper.getColorToken(colorScheme),
	})
