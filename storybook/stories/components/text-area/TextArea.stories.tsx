import type {
	Meta,
	StoryObj,
} from '@storybook/react-native'

import {
	TextArea as CarbonTextArea,
	TextAreaField as CarbonTextAreaField,
	TextAreaFluid as CarbonTextAreaFluid,
	type TextAreaFieldInteractiveState,
	type TextAreaFieldProps,
	type TextAreaFluidProps,
	type TextAreaProps,
} from '@audira/carbon-react-native'

export default {
	title: 'Components/Text Area',
} satisfies Meta

const commonStoryObj: StoryObj<TextAreaFieldProps> = {
	args: {
		interactiveState: 'normal',
		placeholder: 'Placeholder text',
	},
	argTypes: {
		interactiveState: {
			control: 'select',
			options: [
				'normal',
				'disabled',
				'invalid',
				'read_only',
				'warning',
			] satisfies TextAreaFieldInteractiveState[],
		},
		placeholder: {
			control: 'text',
		},
	},
}

export const TextArea: StoryObj<TextAreaProps> = {
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
			<CarbonTextArea
				{ ...args }
			/>
		)
	},
}

export const TextAreaField: StoryObj<TextAreaFieldProps> = {
	...commonStoryObj,
	render(args) {
		return (
			<CarbonTextAreaField
				{ ...args }
			/>
		)
	},
}

export const TextAreaFluid: StoryObj<TextAreaFluidProps> = {
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
			<CarbonTextAreaFluid
				{ ...args }
			/>
		)
	},
}
