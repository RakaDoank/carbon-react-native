import type {
	Meta,
	StoryFn,
} from '@storybook/react-native'

import {
	Button,
	ButtonGroup,
	type ButtonGroupProps,
} from '@audira/carbon-react-native'

export default {
	title: 'Components/Button Group',
	component: ButtonGroup,
	args: {
		size: 'large_productive',
		fluid: false,
		verticalStack: false,
	},
	argTypes: {
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
		fluid: {
			control: 'boolean',
		},
		verticalStack: {
			control: 'boolean',
		},
	},
} satisfies Meta<ButtonGroupProps>

// 2 Buttons with primary
export const Primary_and_Secondary: StoryFn<ButtonGroupProps> = args => {
	return (
		<ButtonGroup
			{ ...args }
			items={{
				Primary: {
					Component: Button.Primary,
					text: 'Primary',
				},
				Secondary: {
					Component: Button.Secondary,
					text: 'Secondary',
				},
			}}
		/>
	)
}

export const Tertiary_and_Primary: StoryFn<ButtonGroupProps> = args => {
	return (
		<ButtonGroup
			{ ...args }
			items={{
				Tertiary: {
					Component: Button.Tertiary,
					text: 'Tertiary',
				},
				Primary: {
					Component: Button.Primary,
					text: 'Primary',
				},
			}}
		/>
	)
}

export const Ghost_and_Primary: StoryFn<ButtonGroupProps> = args => {
	return (
		<ButtonGroup
			{ ...args }
			items={{
				Ghost: {
					Component: Button.Ghost,
					text: 'Ghost',
				},
				Primary: {
					Component: Button.Primary,
					text: 'Primary',
				},
			}}
		/>
	)
}

export const TertiaryDanger_and_Primary: StoryFn<ButtonGroupProps> = args => {
	return (
		<ButtonGroup
			{ ...args }
			items={{
				TertiaryDanger: {
					Component: Button.TertiaryDanger,
					text: 'TertiaryDanger',
				},
				Primary: {
					Component: Button.Primary,
					text: 'Primary',
				},
			}}
		/>
	)
}

export const Ghost_and_PrimaryDanger: StoryFn<ButtonGroupProps> = args => {
	return (
		<ButtonGroup
			{ ...args }
			items={{
				Ghost: {
					Component: Button.Ghost,
					text: 'Ghost',
				},
				PrimaryDanger: {
					Component: Button.PrimaryDanger,
					text: 'PrimaryDanger',
				},
			}}
		/>
	)
}
// ---

// 2 Buttons without primary
export const Tertiary1_and_Tertiary2: StoryFn<ButtonGroupProps> = args => {
	return (
		<ButtonGroup
			{ ...args }
			items={{
				TertiaryComponent: Button.Tertiary,
				Tertiary1: {
					text: 'Tertiary 1',
				},
				Tertiary2: {
					text: 'Tertiary 2',
				},
			}}
		/>
	)
}

export const Ghost_and_Tertiary: StoryFn<ButtonGroupProps> = args => {
	return (
		<ButtonGroup
			{ ...args }
			items={{
				Ghost: {
					Component: Button.Ghost,
					text: 'Ghost',
				},
				Tertiary: {
					Component: Button.Tertiary,
					text: 'Tertiary',
				},
			}}
		/>
	)
}

export const Ghost1_and_Ghost2: StoryFn<ButtonGroupProps> = args => {
	return (
		<ButtonGroup
			{ ...args }
			items={{
				GhostComponent: Button.Ghost,
				Ghost1: {
					text: 'Ghost 1',
				},
				Ghost2: {
					text: 'Ghost 2',
				},
			}}
		/>
	)
}
// ---

// 3 Buttons with primary
export const Tertiary_and_Secondary_and_Primary: StoryFn<ButtonGroupProps> = args => {
	return (
		<ButtonGroup
			{ ...args }
			items={{
				Tertiary: {
					Component: Button.Tertiary,
					text: 'Tertiary',
				},
				Secondary: {
					Component: Button.Secondary,
					text: 'Secondary',
				},
				Primary: {
					Component: Button.Primary,
					text: 'Primary',
				},
			}}
		/>
	)
}

export const Ghost_and_Secondary_and_Primary: StoryFn<ButtonGroupProps> = args => {
	return (
		<ButtonGroup
			{ ...args }
			items={{
				Ghost: {
					Component: Button.Ghost,
					text: 'Ghost',
				},
				Secondary: {
					Component: Button.Secondary,
					text: 'Secondary',
				},
				Primary: {
					Component: Button.Primary,
					text: 'Primary',
				},
			}}
		/>
	)
}

export const Secondary1_and_Secondary2_and_Primary: StoryFn<ButtonGroupProps> = args => {
	return (
		<ButtonGroup
			{ ...args }
			items={{
				Secondary1: {
					Component: Button.Secondary,
					text: 'Secondary1',
				},
				Secondary2: {
					Component: Button.Secondary,
					text: 'Secondary2',
				},
				Primary: {
					Component: Button.Primary,
					text: 'Primary',
				},
			}}
		/>
	)
}

export const Tertiary1_and_Tertiary2_and_Primary: StoryFn<ButtonGroupProps> = args => {
	return (
		<ButtonGroup
			{ ...args }
			items={{
				Tertiary1: {
					Component: Button.Tertiary,
					text: 'Tertiary1',
				},
				Tertiary2: {
					Component: Button.Tertiary,
					text: 'Tertiary2',
				},
				Primary: {
					Component: Button.Primary,
					text: 'Primary',
				},
			}}
		/>
	)
}
// ---

// 3 Buttons without primary
export const Tertiary1_and_Tertiary2_and_Tertiary3: StoryFn<ButtonGroupProps> = args => {
	return (
		<ButtonGroup
			{ ...args }
			items={{
				TertiaryComponent: Button.Tertiary,
				Tertiary1: {
					text: 'Tertiary1',
				},
				Tertiary2: {
					text: 'Tertiary2',
				},
				Tertiary3: {
					text: 'Tertiary3',
				},
			}}
		/>
	)
}

export const TertiaryDanger_and_Tertiary1_and_Tertiary2: StoryFn<ButtonGroupProps> = args => {
	return (
		<ButtonGroup
			{ ...args }
			items={{
				TertiaryDanger: {
					Component: Button.TertiaryDanger,
					text: 'TertiaryDanger',
				},
				Tertiary1: {
					Component: Button.Tertiary,
					text: 'Tertiary1',
				},
				Tertiary2: {
					Component: Button.Tertiary,
					text: 'Tertiary2',
				},
			}}
		/>
	)
}

export const Secondary1_and_Secondary2_and_Secondary3: StoryFn<ButtonGroupProps> = args => {
	return (
		<ButtonGroup
			{ ...args }
			items={{
				SecondaryComponent: Button.Secondary,
				Secondary1: {
					text: 'Secondary1',
				},
				Secondary2: {
					text: 'Secondary2',
				},
				Secondary3: {
					text: 'Secondary3',
				},
			}}
		/>
	)
}
// ---
