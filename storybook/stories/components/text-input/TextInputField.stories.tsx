import type {
	Meta,
	StoryFn,
} from "@storybook/react-native"

import {
	TextInputField as CarbonTextInputField,
	type TextInputFieldInteractiveState,
	type TextInputFieldProps,
	type TextInputFieldSize,
} from "@audira/carbon-react-native"

export default {
	title: "Components/Text Input/Text Input Field",
	component: CarbonTextInputField,
	args: {
		size: "medium",
		interactiveState: "normal",
		placeholder: "Placeholder text",
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
} satisfies Meta<TextInputFieldProps>

export const TextInputField: StoryFn<TextInputFieldProps> = args => {
	return (
		<CarbonTextInputField
			{ ...args }
		/>
	)
}
