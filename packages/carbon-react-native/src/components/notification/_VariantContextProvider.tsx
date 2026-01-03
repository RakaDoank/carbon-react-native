import {
	useContext,
} from "react"

import {
	GlobalConfigContext,
} from "../../_internal/contexts"

import type {
	NotificationColor,
} from "./NotificationColor"
import {
	VariantContext,
} from "./_variant-context"


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
