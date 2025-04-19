/* eslint-disable react-hooks/rules-of-hooks */
import {
	useContext,
} from 'react'

import {
	ThemeContext,
} from '../contexts'

export function use() {
	useContext(ThemeContext)
}
