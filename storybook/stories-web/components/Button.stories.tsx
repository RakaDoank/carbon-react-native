import type {
	Meta,
	StoryFn,
} from '@storybook/react-native-web-vite'

import {
	Button,
} from '@audira/carbon-react-native'

export default {
	title: 'Components/Button',
	args: {
		text: 'Lorem Ipsum',
		size: 'large_productive',
	},
	argTypes: {
		text: {
			type: 'string',
			control: 'text',
		},
		size: {
			control: 'select',
			options: [
				'small',
				'medium',
				'large_productive',
				'large_expressive',
				'extra_large',
				'2xl',
			] satisfies Button.ButtonSize[],
		},
	},
} satisfies Meta<Button.BaseProps>

export const Primary: StoryFn<Button.PrimaryProps> = args => {
	return (
		<Button.Primary
			{ ...args }
		/>
	)
}

export const Secondary: StoryFn<Button.SecondaryProps> = args => {
	return (
		<Button.Secondary
			{ ...args }
		/>
	)
}
