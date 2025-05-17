import type {
	ViewProps,
} from 'react-native'

import type {
	FormHelperTextProps,
} from '../form-helper-text'

import type {
	CheckboxGroupHelperTextMode,
} from './CheckboxGroupHelperTextMode'

export interface CheckboxGroupProps extends ViewProps {
	orientation?: 'vertical' | 'horizontal',
	legend: string,
	helperText?: string,
	helperTextMode?: CheckboxGroupHelperTextMode,
	/**
	 * Set to false if you only want to show your `textLeading` custom node  
	 * Default value is true
	 */
	helperTextModeIcon?: boolean,
	formHelperTextProps?: Omit<
		FormHelperTextProps,
		| 'text'
		| 'error'
	>,
}
