import {
	createContext,
} from 'react'

import type {
	AccordionHeaderProps,
} from './_header'

export interface AccordionContext {
	size?: AccordionHeaderProps['size'],
	flushAlignment?: AccordionHeaderProps['flushAlignment'],
}

export const AccordionContext = createContext<AccordionContext>({})
