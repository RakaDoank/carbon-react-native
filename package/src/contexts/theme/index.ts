import {
	createContext,
} from 'react'

import {
	ColorSchemeGlobal,
} from '../../globals'

import {
	ColorHelper,
} from '../../helpers'

import type {
	ThemeType,
} from '../../types'

export interface Theme {
	colorScheme: ThemeType.ColorScheme,
	color: Record<ThemeType.ColorToken, string>,
}

export const Theme =
	createContext<Theme>({
		colorScheme: ColorSchemeGlobal.get(),
		color: ColorHelper.getColorToken(ColorSchemeGlobal.get()),
	})
