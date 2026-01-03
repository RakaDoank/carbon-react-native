import {
	createContext,
} from "react"

import type {
	ToastContextShowConfig,
} from "./ToastContextShowConfig"

export interface ToastContext {
	show: (
		fn: (id: number) => React.ReactNode,
		config?: ToastContextShowConfig,
	) => void,
	dismiss: (id: number) => void,
}

export const ToastContext = createContext<ToastContext>({
	show() {
		throw new Error("Uninitialized ToastProvider")
	},
	dismiss() {
		throw new Error("Uninitialized ToastProvider")
	},
})
