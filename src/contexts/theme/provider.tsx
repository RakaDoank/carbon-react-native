import {
	useColorScheme,
} from 'react-native'

import {
	ColorHelper,
} from '../../helpers'

import {
	ThemeContext,
} from './context'

export interface ThemeContextProviderProps {
	colorScheme?: ThemeContext['colorScheme'],
	/**
	 * You can override all color by your own. `colorScheme` probably means nothing due to this prop.  
	 */
	overrideColor?: ThemeContext['color'],
	children?: React.ReactNode,
}

export function ThemeContextProvider({
	colorScheme: colorSchemeProp,
	overrideColor,
	children,
}: ThemeContextProviderProps): React.JSX.Element {

	const
		colorSchemeUse =
			useColorScheme(),

		colorScheme =
			colorSchemeProp ?? ColorHelper.getColorScheme(colorSchemeUse)

	return (
		<ThemeContext.Provider
			value={{
				colorScheme,
				color: overrideColor ?? ColorHelper.getColorToken(colorScheme),
			}}
		>
			{ children }
		</ThemeContext.Provider>
	)

}
