import {
	GlobalConfigContext,
} from './context'

export interface GlobalConfigContextProviderProps extends Partial<GlobalConfigContext> {
	children?: React.ReactNode,
}

export function GlobalConfigContextProvider({
	android_buttonRippleEffect = true,
	notificationColor = 'high_contrast',
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
