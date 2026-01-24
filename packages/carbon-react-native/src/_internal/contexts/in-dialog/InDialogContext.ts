import {
	createContext,
} from "react"

export type InDialogContext = boolean

export const InDialogContext = createContext<InDialogContext>(false)
