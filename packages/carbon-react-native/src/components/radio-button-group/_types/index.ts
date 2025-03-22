import type {
	View,
	ViewProps,
} from 'react-native'

import type {
	FormHelperTextProps,
} from '../../form-helper-text'

import type {
	RadioButtonProps,
	RadioButtonRef,
} from '../../radio-button'

import type {
	RadioButtonGroupRefBase,
} from './ref-base'

export type RadioButtonGroupHelperTextMode =
	| 'normal'
	| 'error'
	| 'warning'

export interface RadioButtonGroupProps extends ViewProps {
	controlled?: boolean,
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

export interface RadioButtonGroupRef extends View, RadioButtonGroupRefBase {
}

export interface RadioButtonGroupItemProps extends Omit<
	RadioButtonProps,
	| 'controlled'
	| 'checked'
> {
}

export interface RadioButtonGroupItemRef extends RadioButtonRef {
}
