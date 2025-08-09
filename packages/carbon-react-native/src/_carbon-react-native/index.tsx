import type {
	GlobalConfigContext,
} from '../contexts'

import {
	BreakpointProvider,
} from '../providers/breakpoint'

import {
	GlobalConfigProvider,
} from '../providers/global-config'

import {
	ThemeProvider,
	type ThemeProviderProps,
} from '../providers/theme'

export interface CarbonReactNativeProps extends ThemeProviderProps {
	globalConfig?: GlobalConfigContext,
}

export function CarbonReactNative({
	globalConfig,
	colorScheme,
	children,
}: CarbonReactNativeProps) {

	return (
		<GlobalConfigProvider
			{ ...globalConfig }
		>
			<ThemeProvider
				colorScheme={ colorScheme }
			>
				<BreakpointProvider>
					{ children }
				</BreakpointProvider>
			</ThemeProvider>
		</GlobalConfigProvider>
	)

}
