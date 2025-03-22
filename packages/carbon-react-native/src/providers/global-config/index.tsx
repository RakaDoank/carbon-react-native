import {
	GlobalConfigContext,
} from '../../contexts'

export interface GlobalConfigProps extends Partial<GlobalConfigContext> {
	children?: React.ReactNode,
}

export function GlobalConfig({
	android_buttonRippleEffect = true,
	notificationColor = 'high_contrast',
	toastDuration = 5000,
	children,
}: GlobalConfigProps) {

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
