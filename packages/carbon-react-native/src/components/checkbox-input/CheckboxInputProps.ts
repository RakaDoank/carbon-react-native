import type {
	PressableProps,
	ViewProps,
} from "react-native"

import type {
	CheckboxInputInteractiveState,
} from "./CheckboxInputInteractiveState"

import type {
	CheckboxInputState,
} from "./CheckboxInputState"

export interface CheckboxInputProps extends Omit<
	PressableProps,
	| "defaultValue"
	| "value"
	| "children"
	| "disabled"
	| "style"
> {
	defaultChecked?: CheckboxInputState,
	checked?: CheckboxInputState,
	interactiveState?: CheckboxInputInteractiveState,
	onChange?: (value: CheckboxInputState) => void,
	style?: ViewProps["style"],
}
