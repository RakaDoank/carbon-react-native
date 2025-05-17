import type {
	ViewProps,
} from 'react-native'

import type {
	AccordionSize,
} from './AccordionSize'

export interface AccordionProps extends Omit<ViewProps, 'children'> {
	size?: AccordionSize,
	flushAlignment?: boolean,
	children?: React.ReactNode[],
}
