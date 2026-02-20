import type {
	Meta,
	StoryFn,
} from "@storybook/react-native"

import {
	PasswordInputField as Field,
	type PasswordInputFieldProps,
	type TextInputFieldSize,
} from "@audira/carbon-react-native"

export default {
	title: "Components/Password Input Field",
	component: Field,
	args: {
		size: "medium",
	},
	argTypes: {
		size: {
			control: "select",
			options: [
				"small",
				"medium",
				"large",
			] satisfies TextInputFieldSize[],
		},
	},
} satisfies Meta<PasswordInputFieldProps>

export const PasswordInputField: StoryFn<PasswordInputFieldProps> = args => {
	return (
		<Field
			{ ...args }
		/>
	)
}
