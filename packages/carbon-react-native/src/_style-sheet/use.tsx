/* eslint-disable react-hooks/rules-of-hooks */
import {
	useContext,
} from 'react'

import {
	BreakpointContext,
	ThemeContext,
} from '../contexts'

/**
 * To keep your React Component style prop reactive on color scheme and breakpoint change
 */
export function use() {
	useContext(ThemeContext)
	useContext(BreakpointContext)
}
