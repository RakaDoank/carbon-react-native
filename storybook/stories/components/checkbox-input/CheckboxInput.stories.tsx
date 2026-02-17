import type {
	Meta,
	StoryFn,
} from "@storybook/react-native"

import {
	CheckboxInput as CarbonCheckboxInput,
	type CheckboxInputInteractiveState,
	type CheckboxInputProps,
	type CheckboxInputState,
} from "@audira/carbon-react-native"

export default {
	title: "Components/Checkbox Input",
	component: CarbonCheckboxInput,
	args: {
		interactiveState: "normal",
		defaultChecked: undefined,
		checked: undefined,
	},
	argTypes: {
		defaultChecked: {
			control: "select",
			options: [
				undefined,
				null,
				true,
				false,
			] satisfies (CheckboxInputState | undefined)[],
		},
		checked: {
			control: "select",
			options: [
				undefined,
				null,
				true,
				false,
			] satisfies (CheckboxInputState | undefined)[],
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
} satisfies Meta<CheckboxInputProps>

export const CheckboxInput: StoryFn<CheckboxInputProps> = args => {
	return (
		<CarbonCheckboxInput
			{ ...args }
		/>
	)
}
