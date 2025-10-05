// Probably better to move to the `GlobalContext`
// Historically, it also holds all the Carbon color tokens based on what the `colorScheme` is.
// Holding an object with 150+ properties in the app runtime seems ridiculous

import {
	createContext,
} from 'react'

import {
	ColorSchemeGlobal,
} from '../../_internal/globals'

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
