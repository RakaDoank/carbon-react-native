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

export interface Use extends BreakpointData {
	breakpoint: BreakpointToken,
}

export function use(): Use {

	const
		breakpoint =
			// eslint-disable-next-line react-hooks/rules-of-hooks
			useContext(BreakpointContext)

	return {
		breakpoint,
		...Breakpoint[breakpoint],
	}

}
