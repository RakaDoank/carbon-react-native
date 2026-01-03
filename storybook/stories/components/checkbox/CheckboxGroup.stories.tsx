import type {
	Meta,
	StoryFn,
} from "@storybook/react-native"

import {
	CheckboxGroup as CarbonCheckboxGroup,
	type CheckboxGroupHelperTextMode,
	type CheckboxGroupProps,
} from "@audira/carbon-react-native"

export default {
	title: "Components/Checkbox/Checkbox Group",
	component: CarbonCheckboxGroup,
	args: {
		orientation: "vertical",
		legend: "Legend Text",
		helperText: "Helper text here",
		helperTextMode: "normal",
		helperTextModeIcon: true,
	},
	argTypes: {
		legend: {
			control: "text",
		},
		orientation: {
			control: "select",
			options: [
				"vertical",
				"horizontal",
			] satisfies CheckboxGroupProps["orientation"][],
		},
		helperText: {
			control: "text",
		},
		helperTextMode: {
			control: "select",
			options: [
				"normal",
				"error",
				"warning",
			] satisfies CheckboxGroupHelperTextMode[],
		},
		helperTextModeIcon: {
			control: "boolean",
			description: "Set to false if you only want to show your `formHelperTextProps.textLeading` prop custom node. Default value is true",
		},
	},
} satisfies Meta<CheckboxGroupProps>

export const CheckboxGroup: StoryFn<CheckboxGroupProps> = args => {
	return (
		<CarbonCheckboxGroup
			{ ...args }
		>
			<CarbonCheckboxGroup.Item
				label="Item 1"
			/>
			<CarbonCheckboxGroup.Item
				label="Item 2"
			/>
			<CarbonCheckboxGroup.Item
				label="Item 3"
			/>
		</CarbonCheckboxGroup>
	)
}
