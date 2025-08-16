import type {
	Meta,
	StoryObj,
} from '@storybook/react-native-web-vite'

import {
	TextInput as CarbonTextInput,
	TextInputField as CarbonTextInputField,
	TextInputFluid as CarbonTextInputFluid,
	type TextInputFieldInteractiveState,
	type TextInputFieldProps,
	type TextInputFieldSize,
	type TextInputFluidProps,
	type TextInputProps,
} from '@audira/carbon-react-native'

export default {
	title: 'Components/TextInput',
} satisfies Meta

const commonStoryObj: StoryObj<TextInputFieldProps> = {
	args: {
		size: 'medium',
		interactiveState: 'normal',
		placeholder: 'Placeholder text',
	},
	argTypes: {
		size: {
			control: 'select',
			options: [
				'small',
				'medium',
				'large',
			] satisfies TextInputFieldSize[],
		},
		interactiveState: {
			control: 'select',
			options: [
				'normal',
				'disabled',
				'invalid',
				'read_only',
				'warning',
			] satisfies TextInputFieldInteractiveState[],
		},
		placeholder: {
			control: 'text',
		},
	},
}

export const TextInput: StoryObj<TextInputProps> = {
	args: {
		...commonStoryObj.args,
		label: 'Label',
		helperText: '',
	},
	argTypes: {
		...commonStoryObj.argTypes,
		label: {
			control: 'text',
		},
		helperText: {
			control: 'text',
		},
	},
	render(args) {
		return (
			<CarbonTextInput
				{ ...args }
			/>
		)
	},
}

export const TextInputField: StoryObj<TextInputFieldProps> = {
	...commonStoryObj,
	render(args) {
		return (
			<CarbonTextInputField
				{ ...args }
			/>
		)
	},
}

export const TextInputFluid: StoryObj<TextInputFluidProps> = {
	args: {
		...commonStoryObj.args,
		label: 'Label',
		helperText: '',
	},
	argTypes: {
		...commonStoryObj.argTypes,
		label: {
			control: 'text',
		},
		helperText: {
			control: 'text',
		},
	},
	render(args) {
		return (
			<CarbonTextInputFluid
				{ ...args }
			/>
		)
	},
}
