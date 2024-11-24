import {
	createContext,
} from 'react'

import type {
	CollapsibleProps,
} from '../collapsible'

import type {
	AccordionHeaderProps,
} from './header'

export interface AccordionItemContext {
	open?: boolean,
	onPress?: AccordionHeaderProps['onPress'],
	collapsibleContentContainerStyle?: CollapsibleProps['contentContainerStyle'],
}

export const AccordionItemContext = createContext<AccordionItemContext>({})
