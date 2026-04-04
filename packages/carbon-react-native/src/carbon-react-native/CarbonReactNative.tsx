import {
	BreakpointProvider,
	GlobalConfigProvider,
	ThemeProvider,
} from "../_internal/providers"

import type {
	CarbonReactNativeProps,
} from "./CarbonReactNativeProps"

export function CarbonReactNative({
	// +++ GlobalConfigProviderProps +++
	android_buttonRippleEffect,
	notificationColor,
	toastDuration,
	rtl,
	// --- GlobalConfigProviderProps ---
	// +++ ThemeProviderProps +++
	colorScheme,
	// --- ThemeProviderProps ---
	children,
}: CarbonReactNativeProps) {

	return (
		<GlobalConfigProvider
			android_buttonRippleEffect={ android_buttonRippleEffect }
			notificationColor={ notificationColor }
			toastDuration={ toastDuration }
			rtl={ rtl }
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
