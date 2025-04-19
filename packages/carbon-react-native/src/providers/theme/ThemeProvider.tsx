import {
	useColorScheme,
} from 'react-native'

import {
	ThemeContext,
} from '../../contexts/theme'

import {
	ColorHelper,
} from '../../helpers'

import {
	ColorSchemeGlobal,
} from '../../globals'

import type {
	ThemeProviderProps,
} from './ThemeProviderProps'

export function ThemeProvider({
	colorScheme: colorSchemeProp,
	overrideColor,
	children,
}: ThemeProviderProps): React.JSX.Element {

	const
		colorSchemeUse =
			useColorScheme(),

		colorScheme =
			colorSchemeProp ?? ColorHelper.getColorScheme(colorSchemeUse)

	ColorSchemeGlobal.set(colorScheme)

	return (
		<ThemeContext.Provider
			value={{
				colorScheme,
				color: {
					...ColorHelper.getColorToken(colorScheme),
					...overrideColor,
				},
			}}
		>
			{ children }
		</ThemeContext.Provider>
	)

}
