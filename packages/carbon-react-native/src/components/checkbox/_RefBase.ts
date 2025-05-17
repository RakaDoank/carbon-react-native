import type {
	CheckboxInputRef,
} from '../checkbox-input/CheckboxInputRef'

export interface RefBase {
	readonly value: CheckboxInputRef['value'],
	/**
	 * This method does nothing when `controlled` prop is true
	 */
	setValue: CheckboxInputRef['setValue'],
}
