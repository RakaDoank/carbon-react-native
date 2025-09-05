import type {
	Meta,
	StoryFn,
} from '@storybook/react-native'

import {
	Switch as _Switch,
	type SwitchProps,
	type SwitchSize,
	type SwitchState,
} from '@audira/carbon-react-native'

export default {
	title: 'Components/Switch',
	args: {
		size: 'default',
		state: 'normal',
	},
	argTypes: {
		size: {
			control: 'select',
			options: [
				'default',
				'small',
			] satisfies SwitchSize[],
		},
		state: {
			control: 'select',
			options: [
				'normal',
				'disabled',
				'read_only',
			] satisfies SwitchState[],
		},
	},
} satisfies Meta<SwitchProps>

export const Switch: StoryFn<SwitchProps> = args => {
	return (
		<_Switch
			{ ...args }
		/>
	)
}
