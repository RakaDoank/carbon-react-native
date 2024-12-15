import type {
	View,
	ViewProps,
} from 'react-native'

import type {
	FormHelperTextProps,
} from '../../form-helper-text'

import type {
	RadioButtonGroupRefBase,
} from './ref-base'

import type {
	RadioButtonProps,
	RadioButtonRef,
} from '../../radio-button'

export type RadioButtonGroupHelperTextMode =
	| 'normal'
	| 'error'
	| 'warning'

export interface RadioButtonGroupProps extends ViewProps {
	controlled?: boolean,
	value?: RadioButtonProps['value'],
	orientation?: 'vertical' | 'horizontal',
	legend: string,
	helperText?: string,
	helperTextMode?: RadioButtonGroupHelperTextMode,
	/**
	 * Set to false if you only want to show your `textLeading` custom node  
	 * Default value is true
	 */
	helperTextModeIcon?: boolean,
	onChange?: (
		value: RadioButtonGroupProps['value'],
		index: number,
	) => void,
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
