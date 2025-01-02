import {
	GlobalConfigContext,
} from './context'

export interface GlobalConfigContextProviderProps extends GlobalConfigContext {
	children?: React.ReactNode,
}

export function GlobalConfigContextProvider({
	android_buttonRippleEffect,
	notificationColor,
	children,
}: GlobalConfigContextProviderProps) {

	return (
		<GlobalConfigContext.Provider
			value={{
				android_buttonRippleEffect,
				notificationColor,
			}}
		>
			{ children }
		</GlobalConfigContext.Provider>
	)

}
