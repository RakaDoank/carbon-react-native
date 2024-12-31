import {
	createContext,
} from 'react'

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
	color: NotificationColor,
	children?: React.ReactNode,
}) {

	return (
		<VariantContext.Provider
			value={{
				color,
			}}
		>
			{ children }
		</VariantContext.Provider>
	)

}
