import type {
	Meta,
	StoryFn,
} from '@storybook/react-native'

import {
	TextAreaFluid as CarbonTextAreaFluid,
	type TextAreaFieldInteractiveState,
	type TextAreaFluidProps,
} from '@audira/carbon-react-native'

export default {
	title: 'Components/Text Area/Text Area Fluid',
	component: CarbonTextAreaFluid,
	args: {
		label: 'Label',
		interactiveState: 'normal',
		placeholder: 'Placeholder text',
		helperText: '',
	},
	argTypes: {
		label: {
			control: 'text',
		},
		interactiveState: {
			control: 'select',
			options: [
				'normal',
				'disabled',
				'invalid',
				'read_only',
				'warning',
			] satisfies TextAreaFieldInteractiveState[],
		},
		placeholder: {
			control: 'text',
		},
		helperText: {
			control: 'text',
		},
	},
} satisfies Meta<TextAreaFluidProps>

export const TextAreaFluid: StoryFn<TextAreaFluidProps> = args => {
	return (
		<CarbonTextAreaFluid
			{ ...args }
		/>
	)
}
