import {
	I18nManager,
} from "react-native"

import {
	GlobalConfigContext,
} from "../../contexts/global-config"

import type {
	GlobalConfigProviderProps,
} from "./GlobalConfigProviderProps"

const isRtl = I18nManager.isRTL

export function GlobalConfigProvider({
	android_buttonRippleEffect = true,
	notificationColor = "high_contrast",
	toastDuration = 5000,
	rtl: rtlProp,
	children,
}: GlobalConfigProviderProps) {

	const
		rtl =
			rtlProp ?? isRtl

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
