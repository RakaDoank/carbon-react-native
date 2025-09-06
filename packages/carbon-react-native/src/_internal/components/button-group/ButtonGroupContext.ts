'use client'

import {
	createContext,
} from 'react'

import type {
	Size,
} from '../../../components/button/Size'

export interface ButtonGroupContext {
	size?: Size,
}

export const ButtonGroupContext = createContext<ButtonGroupContext>({
	size: undefined,
})
