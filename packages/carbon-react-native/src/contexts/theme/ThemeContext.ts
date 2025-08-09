import {
	createContext,
} from 'react'

import {
	ColorSchemeGlobal,
} from '../../globals'

import type {
	ThemeType,
} from '../../types'

export interface ThemeContext {
	colorScheme: ThemeType.ColorScheme,
}

export const ThemeContext =
	createContext<ThemeContext>({
		colorScheme: ColorSchemeGlobal.get(),
	})
