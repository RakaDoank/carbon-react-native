import {
	createContext,
} from 'react'

import type {
	ToastShowConfig,
} from './ToastShowConfig'

export interface ToastContext {
	show: (
		fn: (id: number) => React.ReactNode,
		config?: ToastShowConfig,
	) => void,
	dismiss: (id: number) => void,
}

export const ToastContext = createContext<ToastContext>({
	show() {
		throw new Error('Uninitialized ToastProvider')
	},
	dismiss() {
		throw new Error('Uninitialized ToastProvider')
	},
})
