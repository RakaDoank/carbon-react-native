import type {
	Meta,
	StoryFn,
} from "@storybook/react-native"

import {
	Checkbox as CarbonCheckbox,
	type CheckboxInputInteractiveState,
	type CheckboxProps,
} from "@audira/carbon-react-native"

export default {
	title: "Components/Checkbox",
	component: CarbonCheckbox,
	args: {
		label: "Lorem ipsum",
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
			] satisfies CheckboxInputInteractiveState[],
		},
	},
} satisfies Meta<CheckboxProps>

export const Checkbox: StoryFn<CheckboxProps> = args => {
	return (
		<CarbonCheckbox
			{ ...args }
		/>
	)
}
