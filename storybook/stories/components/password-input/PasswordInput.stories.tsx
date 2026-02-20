import type {
	Meta,
	StoryFn,
} from "@storybook/react-native"

import {
	PasswordInput as Input,
	type PasswordInputProps,
	type TextInputSize,
} from "@audira/carbon-react-native"

export default {
	title: "Components/Password Input",
	component: Input,
	args: {
		label: "Type Password",
		size: "medium",
		secureTextEntry: true,
	},
	argTypes: {
		label: {
			control: "text",
		},
		secureTextEntry: {
			control: "boolean",
		},
		size: {
			control: "select",
			options: [
				"small",
				"medium",
				"large",
			] satisfies TextInputSize[],
		},
	},
} satisfies Meta<PasswordInputProps>

export const PasswordInput: StoryFn<PasswordInputProps> = args => {
	return (
		<Input
			{ ...args }
		/>
	)
}
