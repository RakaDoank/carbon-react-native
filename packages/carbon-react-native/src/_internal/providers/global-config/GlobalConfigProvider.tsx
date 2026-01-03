import {
	GlobalConfigContext,
} from "../../contexts/global-config"

import type {
	GlobalConfigProviderProps,
} from "./GlobalConfigProviderProps"

export function GlobalConfigProvider({
	android_buttonRippleEffect,
	notificationColor,
	toastDuration,
	rtl,
	children,
}: GlobalConfigProviderProps) {

	return (
		<GlobalConfigContext.Provider
			value={{
				android_buttonRippleEffect,
				notificationColor,
				toastDuration,
				rtl,
			}}
		>
			{ children }
		</GlobalConfigContext.Provider>
	)

}
