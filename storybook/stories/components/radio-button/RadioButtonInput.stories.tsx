import type {
	Meta,
	StoryFn,
} from "@storybook/react-native"

import {
	RadioButtonInput as CarbonRadioButtonInput,
	type RadioButtonInputInteractiveState,
	type RadioButtonInputProps,
} from "@audira/carbon-react-native"

export default {
	title: "Components/Radio Button/Radio Button Input",
	component: CarbonRadioButtonInput,
	args: {
		interactiveState: "normal",
	},
	argTypes: {
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
} satisfies Meta<RadioButtonInputProps>

export const RadioButtonInput: StoryFn<RadioButtonInputProps> = args => {
	return (
		<CarbonRadioButtonInput
			{ ...args }
		/>
	)
}
