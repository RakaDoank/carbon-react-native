import {
	createContext,
} from 'react'

export interface ToastShowConfig {
	/**
	 * Duration per component in milliseconds
	 */
	duration?: number,
}

export interface Toast {
	show: (
		fn: (id: number) => React.ReactNode,
		config?: ToastShowConfig,
	) => void,
	dismiss: (id: number) => void,
}

export const Toast = createContext<Toast>({
	show() {
		throw new Error('Uninitialized ToastProvider')
	},
	dismiss() {
		throw new Error('Uninitialized ToastProvider')
	},
})
