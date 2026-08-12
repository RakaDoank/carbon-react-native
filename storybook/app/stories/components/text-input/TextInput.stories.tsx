import type {
	Meta,
	StoryFn,
} from "@storybook/react-native"

import {
	TextInput as CarbonTextInput,
	type TextInputFieldInteractiveState,
	type TextInputFieldSize,
	type TextInputProps,
} from "@audira/carbon-react-native"

export default {
	title: "Components/Text Input",
	component: CarbonTextInput,
	args: {
		label: "Label",
		size: "medium",
		interactiveState: "normal",
		placeholder: "Placeholder text",
	},
	argTypes: {
		label: {
			control: "text",
		},
		size: {
			control: "select",
			options: [
				"small",
				"medium",
				"large",
			] satisfies TextInputFieldSize[],
		},
		interactiveState: {
			control: "select",
			options: [
				"normal",
				"disabled",
				"invalid",
				"read_only",
				"warning",
			] satisfies TextInputFieldInteractiveState[],
		},
		placeholder: {
			control: "text",
		},
	},
} satisfies Meta<TextInputProps>

export const TextInput: StoryFn<TextInputProps> = args => {
	return (
		<CarbonTextInput
			{ ...args }
		/>
	)
}
