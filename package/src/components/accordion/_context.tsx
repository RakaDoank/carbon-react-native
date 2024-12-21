import {
	createContext,
} from 'react'

import type {
	CollapsibleProps,
} from '../collapsible'

import type {
	AccordionHeaderProps,
} from './_header'

export interface AccordionContext {
	size?: AccordionHeaderProps['size'],
	flushAlignment?: AccordionHeaderProps['flushAlignment'],
	collapsibleContentContainerStyle?: CollapsibleProps['contentContainerStyle'],
}

export const AccordionContext = createContext<AccordionContext>({})
