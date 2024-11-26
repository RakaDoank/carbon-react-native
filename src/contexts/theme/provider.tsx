import {
	useColorScheme,
} from 'react-native'

import {
	ColorHelper,
} from '../../helpers'

import {
	ThemeContext,
	type ThemeContextInterface,
} from './context'

export interface ThemeContextProviderProps {
	colorScheme?: ThemeContextInterface['colorScheme'],
	children?: React.ReactNode,
}

export function ThemeContextProvider({
	colorScheme: colorSchemeProp,
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
				color: ColorHelper.getColorToken(colorScheme),
			}}
		>
			{ children }
		</ThemeContext.Provider>
	)

}
