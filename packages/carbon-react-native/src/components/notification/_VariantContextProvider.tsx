import {
	useContext,
} from 'react'

import {
	GlobalConfigContext,
} from '../../_internal/contexts'

import {
	VariantContext,
} from './_variant-context'

import type {
	NotificationColor,
} from './NotificationColor'

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
