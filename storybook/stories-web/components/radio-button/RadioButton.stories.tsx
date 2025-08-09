import type {
	Meta,
	StoryObj,
} from '@storybook/react-native-web-vite'

import {
	RadioButton as _RadioButton,
	RadioButtonInput as _RadioButtonInput,
	RadioButtonGroup as _RadioButtonGroup,
	type RadioButtonInputProps,
	type RadioButtonInputInteractiveState,
	type RadioButtonProps,
	type RadioButtonGroupProps,
	type RadioButtonGroupHelperTextMode,
} from '@audira/carbon-react-native'

export default {
	title: 'Components/Radio Button',
} satisfies Meta

const interactiveStateArgTypes: NonNullable<StoryObj<RadioButtonInputProps>['argTypes']>[keyof NonNullable<StoryObj<RadioButtonInputProps>['argTypes']>] = {
	control: 'select',
	options: [
		'normal',
		'disabled',
		'error',
		'read_only',
		'warning',
	] satisfies RadioButtonInputInteractiveState[],
}

export const RadioButton: StoryObj<RadioButtonProps> = {
	args: {
		label: 'Label',
		interactiveState: 'normal',
	},
	argTypes: {
		label: {
			control: 'text',
		},
		interactiveState: interactiveStateArgTypes,
	},
	render(args) {
		return (
			<_RadioButton
				{ ...args }
			/>
		)
	},
}

export const RadioButtonInput: StoryObj<RadioButtonInputProps> = {
	args: {
		interactiveState: 'normal',
	},
	argTypes: {
		interactiveState: interactiveStateArgTypes,
	},
	render(args) {
		return (
			<_RadioButtonInput
				{ ...args }
			/>
		)
	},
}

export const RadioButtonGroup: StoryObj<RadioButtonGroupProps> = {
	args: {
		orientation: 'vertical',
		legend: 'Legend Text',
		helperText: 'Helper text here',
		helperTextMode: 'normal',
		helperTextModeIcon: true,
	},
	argTypes: {
		legend: {
			control: 'text',
		},
		orientation: {
			control: 'select',
			options: [
				'vertical',
				'horizontal',
			] satisfies RadioButtonGroupProps['orientation'][],
		},
		helperText: {
			control: 'text',
		},
		helperTextMode: {
			control: 'select',
			options: [
				'normal',
				'error',
				'warning',
			] satisfies RadioButtonGroupHelperTextMode[],
		},
		helperTextModeIcon: {
			control: 'boolean',
			description: 'Set to false if you only want to show your `formHelperTextProps.textLeading` prop custom node. Default value is true',
		},
	},
	render(args) {
		return (
			<_RadioButtonGroup
				{ ...args }
			>
				<_RadioButtonGroup.Item
					value="bbc"
					label="Item 1"
				/>
				<_RadioButtonGroup.Item
					value="soho"
					label="Item 2"
				/>
				<_RadioButtonGroup.Item
					value="prambors"
					label="Item 3"
				/>
			</_RadioButtonGroup>
		)
	},
}
