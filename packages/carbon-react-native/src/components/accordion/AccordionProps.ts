import type {
	ViewProps,
} from 'react-native'

import type {
	AccordionSize,
} from './AccordionSize'

export interface AccordionProps extends Omit<ViewProps, 'children'> {
	/**
	 * @default 'medium'
	 */
	size?: AccordionSize,
	/**
	 * Use flush alignment when designing within smaller spaces on a page such as side panels or sidebars to achieve better text alignment with other content. Flush alignment is also used to help avoid converging rule lines between components that are close to each other on a page.
	 */
	flushAlignment?: boolean,
	children?: React.ReactNode,
}
