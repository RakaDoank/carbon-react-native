import type {
	Meta,
	StoryFn,
} from "@storybook/react-native"

import {
	PasswordInputFluid as Fluid,
	type PasswordInputFluidProps,
} from "@audira/carbon-react-native"

export default {
	title: "Components/Password Input Fluid",
	component: Fluid,
	args: {
		label: "Type Password",
		secureTextEntry: true,
	},
	argTypes: {
		label: {
			control: "text",
		},
		secureTextEntry: {
			control: "boolean",
		},
	},
} satisfies Meta<PasswordInputFluidProps>

export const PasswordInputFluid: StoryFn<PasswordInputFluidProps> = args => {
	return (
		<Fluid
			{ ...args }
		/>
	)
}
