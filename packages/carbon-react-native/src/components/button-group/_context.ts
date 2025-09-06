'use client'

import {
	createContext,
} from 'react'

export interface Context {
	fluid: boolean,
	verticalStack: boolean,
}

export const Context = createContext<Context>({
	fluid: false,
	verticalStack: false,
})
