import {
	useColorScheme,
} from 'react-native'

import {
	ThemeContext,
} from '../../../contexts'

import {
	ColorHelper,
} from '../../../helpers'

import {
	ColorSchemeGlobal,
} from '../../globals'

import type {
	ThemeProviderProps,
} from './ThemeProviderProps'

export function ThemeProvider({
	colorScheme: colorSchemeProp,
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
			}}
		>
			{ children }
		</ThemeContext.Provider>
	)

}
