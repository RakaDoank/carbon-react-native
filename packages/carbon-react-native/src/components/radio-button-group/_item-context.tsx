import {
	createContext,
} from "react"

import type {
	RadioButtonGroupProps,
} from "./RadioButtonGroupProps"

export interface ItemContext {
	controlled?: boolean,
	value?: RadioButtonGroupProps["selectedValue"],
	setValue?: (value: RadioButtonGroupProps["selectedValue"]) => void,
	setOnChangeGroupEffect?: (value: boolean) => void,
	onChangeGroup?: RadioButtonGroupProps["onChange"],
}

export const ItemContext = createContext<ItemContext>({
})
