import type {
	Meta,
	StoryFn,
} from "@storybook/react-native-web-vite"

import {
	Toggle,
} from "@audira/carbon-react-native"

export default {
	title: "Components/Toggle",
	component: Toggle.Base,
	args: {
		label: "Label",
		actionText: "",
		state: "normal",
	},
	argTypes: {
		label: {
			control: "text",
		},
		actionText: {
			control: "text",
		},
		state: {
			control: "select",
			options: [
				"normal",
				"disabled",
				"read_only",
			] satisfies Toggle.State[],
		},
	},
} satisfies Meta<Toggle.BaseProps>

export const Default: StoryFn<Toggle.DefaultProps> = args => {
	return (
		<Toggle.Default
			{ ...args }
		/>
	)
}

export const Small: StoryFn<Toggle.SmallProps> = args => {
	return (
		<Toggle.Small
			{ ...args }
		/>
	)
}
