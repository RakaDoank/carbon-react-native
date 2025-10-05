import {
	BreakpointProvider,
	GlobalConfigProvider,
	ThemeProvider,
} from '../_internal/providers'

import type {
	CarbonReactNativeProps,
} from './CarbonReactNativeProps'

export function CarbonReactNative({
	// GlobalConfigProviderProps
	android_buttonRippleEffect = true,
	notificationColor = 'high_contrast',
	toastDuration = 5000,

	// ThemeProviderProps
	colorScheme,

	children,
}: CarbonReactNativeProps) {

	return (
		<GlobalConfigProvider
			android_buttonRippleEffect={ android_buttonRippleEffect }
			notificationColor={ notificationColor }
			toastDuration={ toastDuration }
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
