import {
	GlobalConfigContext,
} from '../../contexts/global-config'

import type {
	GlobalConfigProviderProps,
} from './GlobalConfigProviderProps'

export function GlobalConfigProvider({
	android_buttonRippleEffect,
	notificationColor,
	toastDuration,
	children,
}: GlobalConfigProviderProps) {

	return (
		<GlobalConfigContext.Provider
			value={{
				android_buttonRippleEffect,
				notificationColor,
				toastDuration,
			}}
		>
			{ children }
		</GlobalConfigContext.Provider>
	)

}
