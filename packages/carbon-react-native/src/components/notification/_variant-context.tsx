import {
	createContext,
	useContext,
} from 'react'

import {
	GlobalConfigContext,
} from '../../contexts'

import type {
	NotificationColor,
} from './types'

export interface VariantContext {
	color: NotificationColor,
}

export const VariantContext = createContext<VariantContext>({
	color: 'high_contrast',
})

export function VariantContextProvider({
	color,
	children,
}: {
	color?: NotificationColor,
	children?: React.ReactNode,
}) {

	const
		globalConfigContext =
			useContext(GlobalConfigContext)

	return (
		<VariantContext.Provider
			value={{
				color: color ?? globalConfigContext.notificationColor,
			}}
		>
			{ children }
		</VariantContext.Provider>
	)

}
