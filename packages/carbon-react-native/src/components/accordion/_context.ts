import {
	createContext,
} from 'react'

import type {
	CollapsibleProps,
} from '../collapsible'

import type {
	AccordionHeaderProps,
} from './AccordionHeaderProps'

export interface Context {
	size?: AccordionHeaderProps['size'],
	flushAlignment?: AccordionHeaderProps['flushAlignment'],
	collapsibleContentContainerStyle?: CollapsibleProps['contentContainerStyle'],
}

export const Context = createContext<Context>({})
