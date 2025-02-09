import {
	createContext,
} from 'react'

import type {
	CollapsibleProps,
} from '../collapsible'

import type {
	HeaderProps,
} from './_header'

export interface Context {
	size?: HeaderProps['size'],
	flushAlignment?: HeaderProps['flushAlignment'],
	collapsibleContentContainerStyle?: CollapsibleProps['contentContainerStyle'],
}

export const Context = createContext<Context>({})
