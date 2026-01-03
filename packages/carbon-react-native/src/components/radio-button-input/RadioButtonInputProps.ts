import type {
	PressableProps,
	ViewProps,
} from "react-native"

import type {
	RadioButtonInputInteractiveState,
} from "./RadioButtonInputInteractiveState"

export interface RadioButtonInputProps extends Omit<
	PressableProps,
	| "children"
	| "disabled"
	| "style"
> {
	defaultChecked?: boolean,
	checked?: boolean,
	value?: string | number,
	interactiveState?: RadioButtonInputInteractiveState,
	onChange?: (
		checked: NonNullable<RadioButtonInputProps["checked"]>,
		value: RadioButtonInputProps["value"],
	) => void,
	style?: ViewProps["style"],
}
