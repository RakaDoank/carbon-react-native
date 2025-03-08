import {
	GlobalConfigContext,
} from '../../contexts/global-config'

export interface GlobalConfigProviderProps extends Partial<GlobalConfigContext> {
	children?: React.ReactNode,
}

export function GlobalConfigProvider({
	android_buttonRippleEffect = true,
	notificationColor = 'high_contrast',
	children,
}: GlobalConfigProviderProps) {

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
