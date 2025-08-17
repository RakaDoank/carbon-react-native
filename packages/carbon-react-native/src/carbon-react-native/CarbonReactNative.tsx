import {
	BreakpointProvider,
	GlobalConfigProvider,
	ThemeProvider,
} from '../_internal/providers'

import type {
	CarbonReactNativeProps,
} from './CarbonReactNativeProps'

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
