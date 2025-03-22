import type {
	GlobalConfigContext,
} from '../contexts'

import {
	GlobalConfigProvider,
	ThemeProvider,
	type ThemeProviderProps,
} from '../providers'

export interface CarbonReactNativeProps extends ThemeProviderProps {
	globalConfig?: GlobalConfigContext,
}

export function CarbonReactNative({
	globalConfig,
	colorScheme,
	overrideColor,
	children,
}: CarbonReactNativeProps) {

	return (
		<GlobalConfigProvider
			{ ...globalConfig }
		>
			<ThemeProvider
				colorScheme={ colorScheme }
				overrideColor={ overrideColor }
			>
				{ children }
			</ThemeProvider>
		</GlobalConfigProvider>
	)

}
