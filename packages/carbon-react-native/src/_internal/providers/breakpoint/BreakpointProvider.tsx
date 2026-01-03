import {
	useWindowDimensions,
} from "react-native"

import {
	BreakpointContext,
} from "../../../contexts/breakpoint"

import {
	BreakpointHelper,
} from "../../../helpers"

import {
	BreakpointGlobal,
} from "../../globals"

import type {
	BreakpointProviderProps,
} from "./BreakpointProviderProps"

export function BreakpointProvider({
	children,
}: BreakpointProviderProps) {

	const
		windowDimensions =
			useWindowDimensions(),

		breakpoint =
			BreakpointHelper.getToken(windowDimensions.width)

	BreakpointGlobal.set(breakpoint)

	return (
		<BreakpointContext.Provider
			value={ breakpoint }
		>
			{ children }
		</BreakpointContext.Provider>
	)

}
