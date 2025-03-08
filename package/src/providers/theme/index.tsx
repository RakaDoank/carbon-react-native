import {
	useColorScheme,
} from 'react-native'

import {
	ColorHelper,
} from '../../helpers'

import {
	ColorSchemeGlobal,
} from '../../globals'

import {
	ThemeContext,
} from '../../contexts/theme'

export interface ThemeProviderProps {
	colorScheme?: ThemeContext['colorScheme'],
	/**
	 * You can override all color by your own. `colorScheme` probably means nothing due to this prop.  
	 */
	overrideColor?: Partial<ThemeContext['color']>,
	children?: React.ReactNode,
}

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
