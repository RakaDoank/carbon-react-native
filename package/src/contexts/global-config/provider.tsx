import {
	GlobalConfigContext,
} from './context'

export interface GlobalConfigContextProps extends GlobalConfigContext {
	children?: React.ReactNode,
}

export function GlobalConfigContextProvider({
	android_buttonRippleEffect,
	notificationColor,
	children,
}: GlobalConfigContextProps) {

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
