import type {
	Meta,
	StoryFn,
} from "@storybook/react-native"

import {
	TextInputFluid as CarbonTextInputFluid,
	type TextInputFieldInteractiveState,
	type TextInputFluidProps,
} from "@audira/carbon-react-native"

export default {
	title: "Components/Text Input/Text Input Fluid",
	component: CarbonTextInputFluid,
	args: {
		label: "Label",
		interactiveState: "normal",
		placeholder: "Placeholder text",
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
				"invalid",
				"read_only",
				"warning",
			] satisfies TextInputFieldInteractiveState[],
		},
		placeholder: {
			control: "text",
		},
	},
} satisfies Meta<TextInputFluidProps>

export const TextInputFluid: StoryFn<TextInputFluidProps> = args => {
	return (
		<CarbonTextInputFluid
			{ ...args }
		/>
	)
}
