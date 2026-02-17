import type {
	Meta,
	StoryFn,
} from "@storybook/react-native"

import {
	Checkbox as CarbonCheckbox,
	type CheckboxInputInteractiveState,
	type CheckboxInputState,
	type CheckboxProps,
} from "@audira/carbon-react-native"

export default {
	title: "Components/Checkbox",
	component: CarbonCheckbox,
	args: {
		label: "Lorem ipsum",
		interactiveState: "normal",
		defaultChecked: undefined,
		checked: undefined,
	},
	argTypes: {
		label: {
			control: "text",
		},
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
} satisfies Meta<CheckboxProps>

export const Checkbox: StoryFn<CheckboxProps> = args => {
	return (
		<CarbonCheckbox
			{ ...args }
		/>
	)
}
