import type {
	GlobalConfigContext,
} from '../contexts'

import {
	BreakpointProvider,
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
				<BreakpointProvider>
					{ children }
				</BreakpointProvider>
			</ThemeProvider>
		</GlobalConfigProvider>
	)

}
