import type {
	Meta,
	StoryFn,
} from '@storybook/react-native'

import {
	Button,
} from '@audira/carbon-react-native'

import Add from '@carbon/icons/svg/32/add.svg'
import AiGenerate from '@carbon/icons/svg/32/ai-generate.svg'
import CarbonForIbmProduct from '@carbon/icons/svg/32/carbon-for-ibm-product.svg'

export default {
	title: 'Components/Button',
	component: Button.Base,
	args: {
		text: 'Lorem Ipsum',
		size: 'large_productive',
		// @ts-expect-error Re mapping
		Icon: 'none',
	},
	argTypes: {
		text: {
			type: 'string',
			control: 'text',
		},
		Icon: {
			control: 'select',
			options: [
				'none',
				'Add20',
				'AiGenerate20',
				'CarbonForIbmProduct20',
			],
			mapping: {
				'none': undefined,
				'add.svg': Add,
				'ai-generate.svg': AiGenerate,
				'carbon-for-ibm-product.svg': CarbonForIbmProduct,
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
			] satisfies Button.Size[],
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
			Icon={ args.Icon ?? Add }
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
