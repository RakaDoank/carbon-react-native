'use client'

import {
	createContext,
} from 'react'

import type {
	Size,
} from '../../../components/button/Size'

import type {
	ButtonGroupProps,
} from '../../../components/button-group/ButtonGroupProps'

export interface ButtonGroupContext {
	size?: Size,
	fluid?: ButtonGroupProps['fluid'],
	vertical?: ButtonGroupProps['vertical'],
}

export const ButtonGroupContext = createContext<ButtonGroupContext>({
	size: undefined,
	fluid: undefined,
	vertical: undefined,
})
