import {
	useContext,
} from 'react'

import {
	Breakpoints,
} from '@audira/carbon-react-native-elements'

import {
	BreakpointContext,
} from '../../contexts'

import type {
	UseBreakpoint,
} from './UseBreakpoint'

export function useBreakpoint(): UseBreakpoint {

	const
		breakpoint =
			useContext(BreakpointContext)

	return {
		breakpoint,
		...Breakpoints[breakpoint],
	}

}
