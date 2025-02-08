import type {
	GlobalConfigContext,
} from '../contexts/global-config/context'
import {
	GlobalConfigContextProvider,
} from '../contexts/global-config/provider'

import {
	ThemeContextProvider,
	type ThemeContextProviderProps,
} from '../contexts/theme/provider'

export interface CarbonReactNativeProps extends ThemeContextProviderProps {
	globalConfig?: GlobalConfigContext,
}

export function CarbonReactNative({
	globalConfig,
	colorScheme,
	overrideColor,
	children,
}: CarbonReactNativeProps) {

	return (
		<GlobalConfigContextProvider
			{ ...globalConfig }
		>
			<ThemeContextProvider
				colorScheme={ colorScheme }
				overrideColor={ overrideColor }
			>
				{ children }
			</ThemeContextProvider>
		</GlobalConfigContextProvider>
	)

}
