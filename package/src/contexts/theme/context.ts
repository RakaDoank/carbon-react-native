import {
	createContext,
} from 'react'

import {
	ColorHelper,
} from '../../helpers'

import type {
	ThemeType,
} from '../../types'

export interface ThemeContext {
	colorScheme: ThemeType.ColorScheme,
	color: Record<ThemeType.ColorToken, string>,
}

const
	colorScheme =
		ColorHelper.getColorScheme()

export const ThemeContext =
	createContext<ThemeContext>({
		colorScheme,
		color: ColorHelper.getColorToken(colorScheme),
	})
