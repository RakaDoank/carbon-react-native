import {
	createContext,
} from "react"

import type {
	ModalProps,
} from "../../../components/modal/ModalProps"

import type {
	ModalSize,
} from "../../../components/modal/ModalSize"

export interface ModalContext {
	size: ModalSize,
	applyInsets: NonNullable<ModalProps["applyInsets"]>,
	applyInsetsEdges: NonNullable<ModalProps["applyInsetsEdges"]>,
}

export const ModalContext = createContext<ModalContext>({
	size: "medium",
	applyInsets: "in_dialog_and_small_bp",
	applyInsetsEdges: {
		top: true,
		bottom: true,
		left: true,
		right: true,
	},
})
