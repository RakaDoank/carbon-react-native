import type {
	Meta,
	StoryFn,
} from '@storybook/react-native'

import {
	CheckboxInput as CarbonCheckboxInput,
	type CheckboxInputInteractiveState,
	type CheckboxInputProps,
} from '@audira/carbon-react-native'

export default {
	title: 'Components/Checkbox/Checkbox Input',
	component: CarbonCheckboxInput,
	args: {
		interactiveState: 'normal',
	},
	argTypes: {
		interactiveState: {
			control: 'select',
			options: [
				'normal',
				'disabled',
				'error',
				'read_only',
				'warning',
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
