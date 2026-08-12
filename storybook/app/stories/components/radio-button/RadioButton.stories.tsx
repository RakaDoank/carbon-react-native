import type {
	Meta,
	StoryFn,
} from "@storybook/react-native"

import {
	RadioButton as CarbonRadioButton,
	type RadioButtonInputInteractiveState,
	type RadioButtonProps,
} from "@audira/carbon-react-native"

export default {
	title: "Components/Radio Button",
	component: CarbonRadioButton,
	args: {
		label: "Label",
		interactiveState: "normal",
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
				"error",
				"read_only",
				"warning",
			] satisfies RadioButtonInputInteractiveState[],
		},
	},
} satisfies Meta<RadioButtonProps>

export const RadioButton: StoryFn<RadioButtonProps> = args => {
	return (
		<CarbonRadioButton
			{ ...args }
		/>
	)
}
