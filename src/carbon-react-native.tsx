import {
	ThemeContextProvider,
	type ThemeContextProviderProps,
} from './contexts/theme/provider'

export interface CarbonReactNativeProps extends ThemeContextProviderProps {
}

export function CarbonReactNative({
	colorScheme,
	children,
}: CarbonReactNativeProps) {

	return (
		<ThemeContextProvider
			colorScheme={ colorScheme }
		>
			{ children }
		</ThemeContextProvider>
	)

}
