import type {
	PressableProps,
	ViewProps,
} from "react-native"

import type {
	CheckboxInputProps,
} from "../checkbox-input"

import type {
	FormLabelProps,
} from "../form-label"

export interface CheckboxProps extends Omit<ViewProps, "children"> {
	defaultChecked?: CheckboxInputProps["defaultChecked"],
	checked?: CheckboxInputProps["checked"],
	interactiveState?: CheckboxInputProps["interactiveState"],
	label: string,
	onChange?: CheckboxInputProps["onChange"],
	onPress?: CheckboxInputProps["onPress"],
	checkboxInputProps?: Omit<
		CheckboxInputProps,
		| "defaultChecked"
		| "checked"
		| "interactiveState"
		| "role"
		| "onChange"
	>,
	formLabelProps?: Omit<FormLabelProps, "label">,
	pressableProps?: Omit<
		PressableProps,
		| "role"
		| "style"
		| "onPress"
	> & {
		style?: ViewProps["style"],
	},
}
