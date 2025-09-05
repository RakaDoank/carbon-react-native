import type {
	Meta,
	StoryFn,
} from '@storybook/react-native'

import {
	Button,
} from '@audira/carbon-react-native'

import {
	AiGenerate20,
	Add20,
	CarbonForIbmProduct20,
} from '@carbon/icons/es'

export default {
	title: 'Components/Button',
	args: {
		text: 'Lorem Ipsum',
		size: 'large_productive',
		icon: 'none',
	},
	argTypes: {
		text: {
			type: 'string',
			control: 'text',
		},
		icon: {
			control: 'select',
			options: [
				'none',
				'Add20',
				'AiGenerate20',
				'CarbonForIbmProduct20',
			],
			mapping: {
				'none': undefined,
				'Add20': Add20,
				'AiGenerate20': AiGenerate20,
				'CarbonForIbmProduct20': CarbonForIbmProduct20,
			},
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

export const Ghost: StoryFn<Button.GhostProps> = args => {
	return (
		<Button.Ghost
			{ ...args }
		/>
	)
}

export const GhostDanger: StoryFn<Button.GhostDangerProps> = args => {
	return (
		<Button.GhostDanger
			{ ...args }
		/>
	)
}

export const GhostIcon: StoryFn<Button.GhostIconProps> = args => {
	delete (args as unknown as Button.BaseProps).text

	return (
		<Button.GhostIcon
			{ ...args }
			icon={ args.icon ?? Add20 }
		/>
	)
}

export const Primary: StoryFn<Button.PrimaryProps> = args => {
	return (
		<Button.Primary
			{ ...args }
		/>
	)
}

export const PrimaryDanger: StoryFn<Button.PrimaryDangerProps> = args => {
	return (
		<Button.PrimaryDanger
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

export const Tertiary: StoryFn<Button.TertiaryProps> = args => {
	return (
		<Button.Tertiary
			{ ...args }
		/>
	)
}

export const TertiaryDanger: StoryFn<Button.TertiaryDangerProps> = args => {
	return (
		<Button.TertiaryDanger
			{ ...args }
		/>
	)
}
