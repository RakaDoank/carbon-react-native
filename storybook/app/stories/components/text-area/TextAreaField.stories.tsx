import type {
	Meta,
	StoryFn,
} from "@storybook/react-native"

import {
	TextAreaField as CarbonTextAreaField,
	type TextAreaFieldInteractiveState,
	type TextAreaFieldProps,
} from "@audira/carbon-react-native"

export default {
	title: "Components/Text Area/Text Area Field",
	component: CarbonTextAreaField,
	args: {
		interactiveState: "normal",
		placeholder: "Placeholder text",
	},
	argTypes: {
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
	},
} satisfies Meta<TextAreaFieldProps>

export const TextAreaField: StoryFn<TextAreaFieldProps> = args => {
	return (
		<CarbonTextAreaField
			{ ...args }
		/>
	)
}
