import {
	ThemeContextProvider,
	type ThemeContextProviderProps,
} from '../contexts/theme/provider'

export interface CarbonBootstrapProps extends ThemeContextProviderProps {
}

export function CarbonBootstrap({
	colorScheme,
	children,
}: CarbonBootstrapProps) {

	return (
		<ThemeContextProvider
			colorScheme={ colorScheme }
		>
			{ children }
		</ThemeContextProvider>
	)

}
