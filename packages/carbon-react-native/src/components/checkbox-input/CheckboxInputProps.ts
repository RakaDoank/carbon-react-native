import type {
	PressableProps,
	ViewProps,
} from "react-native"

import type {
	CheckboxInputInteractiveState,
} from "./CheckboxInputInteractiveState"

import type {
	CheckboxInputValue,
} from "./CheckboxInputValue"

export interface CheckboxInputProps extends Omit<
	PressableProps,
	| "children"
	| "disabled"
	| "style"
> {
	defaultValue?: CheckboxInputValue,
	value?: CheckboxInputValue,
	interactiveState?: CheckboxInputInteractiveState,
	onChange?: (value: CheckboxInputValue) => void,
	style?: ViewProps["style"],
}
