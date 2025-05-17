import {
	useContext,
} from 'react'

import {
	Breakpoint,
	type BreakpointData,
	type BreakpointToken,
} from '@audira/carbon-react-native-elements'

import {
	BreakpointContext,
} from '../../contexts'

export interface UseBreakpoint extends BreakpointData {
	breakpoint: BreakpointToken,
}

export function useBreakpoint(): UseBreakpoint {

	const
		breakpoint =
			useContext(BreakpointContext)

	return {
		breakpoint,
		...Breakpoint[breakpoint],
	}

}
