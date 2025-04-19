import {
	createContext,
} from 'react'

import type {
	BreakpointToken,
} from '@audira/carbon-react-native-elements'

export const BreakpointContext = createContext<BreakpointToken>('small')
