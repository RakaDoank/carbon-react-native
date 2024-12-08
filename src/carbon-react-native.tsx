import {
	ThemeContextProvider,
	type ThemeContextProviderProps,
} from './contexts/theme/provider'

export interface CarbonReactNativeProps extends ThemeContextProviderProps {
}

export function CarbonReactNative({
	colorScheme,
	overrideColor,
	children,
}: CarbonReactNativeProps) {

	return (
		<ThemeContextProvider
			colorScheme={ colorScheme }
			overrideColor={ overrideColor }
		>
			{ children }
		</ThemeContextProvider>
	)

}
