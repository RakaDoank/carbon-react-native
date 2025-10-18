import type {
	Meta,
	StoryFn,
} from '@storybook/react-native'

import {
	Loading as CarbonLoading,
	type LoadingProps,
	type LoadingType,
} from '@audira/carbon-react-native'

export default {
	title: 'Components/Loading',
	component: CarbonLoading,
	args: {
		type: 'large',
	},
	argTypes: {
		type: {
			control: 'select',
			options: [
				'small',
				'large',
			] satisfies LoadingType[],
		},
	},
} satisfies Meta<LoadingProps>

export const Loading: StoryFn<LoadingProps> = args => {
	return (
		<CarbonLoading
			{ ...args }
		/>
	)
}
