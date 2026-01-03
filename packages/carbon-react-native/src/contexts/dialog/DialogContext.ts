import {
	createContext,
} from "react"

import type {
	DialogData,
} from "./DialogData"

export interface DialogContext {
	show: (data: DialogData) => void,
	dismiss: () => Promise<void>,
	dismissAll: () => Promise<void>,
}

const error = new Error("Unitialized `<DialogProvider>`. Make sure you wrap your React app with `<DialogProvider>`")

export const DialogContext = createContext<DialogContext>({
	show() {
		throw error
	},
	dismiss() {
		throw error
	},
	dismissAll() {
		throw error
	},
})
