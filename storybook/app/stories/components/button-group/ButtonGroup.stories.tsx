import type {
	Meta,
	StoryFn,
} from "@storybook/react-native"

import {
	Button,
	ButtonGroup as CarbonButtonGroup,
	type ButtonGroupProps,
} from "@audira/carbon-react-native"

export default {
	title: "Components/Button Group",
	component: CarbonButtonGroup,
	args: {
		size: "large_productive",
		fluid: false,
		vertical: false,
		oneAlone: false,
	},
	argTypes: {
		size: {
			control: "select",
			options: [
				"small",
				"medium",
				"large_productive",
				"large_expressive",
				"extra_large",
				"2xl",
			] satisfies Button.Size[],
		},
		fluid: {
			control: "boolean",
		},
		vertical: {
			control: "boolean",
		},
		oneAlone: {
			control: "boolean",
		},
	},
} satisfies Meta<ButtonGroupProps>

export const ButtonGroup: StoryFn<ButtonGroupProps> = args => {
	return (
		<CarbonButtonGroup
			{ ...args }
			button1={
				<Button.Secondary
					text="Secondary 1"
				/>
			}
			button2={
				<Button.Secondary
					text="Secondary 2"
				/>
			}
			button3={
				<Button.Secondary
					text="Secondary 3"
				/>
			}
		/>
	)
}
