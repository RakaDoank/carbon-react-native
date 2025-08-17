import {
	useWindowDimensions,
} from 'react-native'

import {
	Breakpoint,
} from '@audira/carbon-react-native-elements'

import {
	BreakpointContext,
} from '../../../contexts/breakpoint'

import {
	BreakpointGlobal,
} from '../../globals'

import type {
	BreakpointProviderProps,
} from './BreakpointProviderProps'

export function BreakpointProvider({
	children,
}: BreakpointProviderProps) {

	const
		windowDimensions =
			useWindowDimensions(),

		breakpoint =
			windowDimensions.width < Breakpoint.medium.value.px ? (
				'small'
			) : windowDimensions.width < Breakpoint.large.value.px ? (
				'medium'
			) : windowDimensions.width < Breakpoint.x_large.value.px ? (
				'large'
			) : windowDimensions.width < Breakpoint.max.value.px ? (
				'x_large'
			) : (
				'max'
			)

	BreakpointGlobal.set(breakpoint)

	return (
		<BreakpointContext.Provider
			value={ breakpoint }
		>
			{ children }
		</BreakpointContext.Provider>
	)

}
