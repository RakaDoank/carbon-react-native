import type {
	Meta,
	StoryFn,
} from "@storybook/react-native"

import {
	TextArea as CarbonTextArea,
	type TextAreaFieldInteractiveState,
	type TextAreaProps,
} from "@audira/carbon-react-native"

export default {
	title: "Components/Text Area",
	component: CarbonTextArea,
	args: {
		label: "Label",
		interactiveState: "normal",
		placeholder: "Placeholder text",
		helperText: "",
	},
	argTypes: {
		label: {
			control: "text",
		},
		interactiveState: {
			control: "select",
			options: [
				"normal",
				"disabled",
				"invalid",
				"read_only",
				"warning",
			] satisfies TextAreaFieldInteractiveState[],
		},
		placeholder: {
			control: "text",
		},
		helperText: {
			control: "text",
		},
	},
} satisfies Meta<TextAreaProps>

export const TextArea: StoryFn<TextAreaProps> = args => {
	return (
		<CarbonTextArea
			{ ...args }
		/>
	)
}
