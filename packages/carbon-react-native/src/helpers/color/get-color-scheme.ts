import {
	Appearance,
	type ColorSchemeName,
} from 'react-native'

import type * as ThemeType from '../../types/theme'

export function getColorScheme(
	appearanceColorScheme?: ColorSchemeName,
): ThemeType.ColorScheme {
	return mapScheme[ appearanceColorScheme || Appearance.getColorScheme() || 'light' ]
}

const
	mapScheme: Record<Extract<ColorSchemeName, string>, ThemeType.ColorScheme> =
		{
			light: 'gray_10',
			dark: 'gray_100',
		}
