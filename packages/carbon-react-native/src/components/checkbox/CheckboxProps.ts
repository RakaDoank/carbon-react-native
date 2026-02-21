import type {
	PressableProps,
} from "react-native"

import type {
	BoxProps,
} from "../box"

import type {
	CheckboxInputProps,
} from "../checkbox-input"

import type {
	FormLabelProps,
} from "../form-label"

export interface CheckboxProps extends Omit<BoxProps, "children"> {
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
		style?: BoxProps["style"],
	},
}
