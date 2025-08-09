import type {
	Meta,
	StoryObj,
} from '@storybook/react-native-web-vite'

import {
	Checkbox as _Checkbox,
	CheckboxInput as _CheckboxInput,
	CheckboxGroup as _CheckboxGroup,
	type CheckboxInputProps,
	type CheckboxInputInteractiveState,
	type CheckboxProps,
	type CheckboxGroupProps,
	type CheckboxGroupHelperTextMode,
} from '@audira/carbon-react-native'

export default {
	title: 'Components/Checkbox',
} satisfies Meta

const interactiveStateArgTypes: NonNullable<StoryObj<CheckboxInputProps>['argTypes']>[keyof NonNullable<StoryObj<CheckboxInputProps>['argTypes']>] = {
	control: 'select',
	options: [
		'normal',
		'disabled',
		'error',
		'read_only',
		'warning',
	] satisfies CheckboxInputInteractiveState[],
}

export const Checkbox: StoryObj<CheckboxProps> = {
	args: {
		label: 'Lorem ipsum',
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
			<_Checkbox
				{ ...args }
			/>
		)
	},
}

export const CheckboxInput: StoryObj<CheckboxInputProps> = {
	args: {
		interactiveState: 'normal',
	},
	argTypes: {
		interactiveState: interactiveStateArgTypes,
	},
	render(args) {
		return (
			<_CheckboxInput
				{ ...args }
			/>
		)
	},
}

export const CheckboxGroup: StoryObj<CheckboxGroupProps> = {
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
			] satisfies CheckboxGroupProps['orientation'][],
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
			] satisfies CheckboxGroupHelperTextMode[],
		},
		helperTextModeIcon: {
			control: 'boolean',
			description: 'Set to false if you only want to show your `formHelperTextProps.textLeading` prop custom node. Default value is true',
		},
	},
	render(args) {
		return (
			<_CheckboxGroup
				{ ...args }
			>
				<_CheckboxGroup.Item
					label="Item 1"
				/>
				<_CheckboxGroup.Item
					label="Item 2"
				/>
				<_CheckboxGroup.Item
					label="Item 3"
				/>
			</_CheckboxGroup>
		)
	},
}
