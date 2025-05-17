import type {
	ViewProps,
} from 'react-native'

import type {
	FormHelperTextProps,
} from '../form-helper-text/FormHelperTextProps'

import type {
	RadioButtonProps,
} from '../radio-button/RadioButtonProps'

import type {
	RadioButtonGroupHelperTextMode,
} from './RadioButtonGroupHelperTextMode'

export interface RadioButtonGroupProps extends ViewProps {
	defaultSelectedValue?: RadioButtonProps['value'],
	selectedValue?: RadioButtonProps['value'],
	orientation?: 'vertical' | 'horizontal',
	legend: string,
	helperText?: string,
	helperTextMode?: RadioButtonGroupHelperTextMode,
	/**
	 * Set to false if you only want to show your `textLeading` custom node  
	 * Default value is true
	 */
	helperTextModeIcon?: boolean,
	onChange?: (value: RadioButtonGroupProps['selectedValue']) => void,
	formHelperTextProps?: Omit<
		FormHelperTextProps,
		| 'text'
		| 'error'
	>,
}
