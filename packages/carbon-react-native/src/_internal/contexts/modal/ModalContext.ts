import {
	createContext,
} from "react"

import type {
	ModalSize,
} from "../../../components/modal/ModalSize"

export interface ModalContext {
	size: ModalSize,
}

export const ModalContext = createContext<ModalContext>({
	size: "medium",
})
