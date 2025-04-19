import {
	createContext,
} from 'react'

import type {
	ColorToken,
} from '@audira/carbon-react-native-elements'

import {
	ColorSchemeGlobal,
} from '../../globals'

import {
	ColorHelper,
} from '../../helpers'

import type {
	ThemeType,
} from '../../types'

export interface ThemeContext {
	colorScheme: ThemeType.ColorScheme,
	color: Record<ColorToken, string>,
}

export const ThemeContext =
	createContext<ThemeContext>({
		colorScheme: ColorSchemeGlobal.get(),
		color: ColorHelper.getColorToken(ColorSchemeGlobal.get()),
	})
