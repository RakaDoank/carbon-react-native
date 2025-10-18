import type {
	Meta,
	StoryFn,
} from '@storybook/react-native'

import {
	RadioButtonGroup as CarbonRadioButtonGroup,
	type RadioButtonGroupHelperTextMode,
	type RadioButtonGroupProps,
} from '@audira/carbon-react-native'

export default {
	title: 'Components/Radio Button/Radio Button Group',
	component: CarbonRadioButtonGroup,
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
} satisfies Meta<RadioButtonGroupProps>

export const RadioButtonGroup: StoryFn<RadioButtonGroupProps> = args => {
	return (
		<CarbonRadioButtonGroup
			{ ...args }
		>
			<CarbonRadioButtonGroup.Item
				value="bbc"
				label="Item 1"
			/>
			<CarbonRadioButtonGroup.Item
				value="soho"
				label="Item 2"
			/>
			<CarbonRadioButtonGroup.Item
				value="prambors"
				label="Item 3"
			/>
		</CarbonRadioButtonGroup>
	)
}
