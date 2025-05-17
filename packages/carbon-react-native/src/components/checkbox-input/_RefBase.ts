import type {
	CheckboxInputValue,
} from './CheckboxInputValue'

export interface RefBase {
	readonly value: CheckboxInputValue,
	/**
	 * This method does nothing when `controlled` prop is true
	 */
	setValue: (value: CheckboxInputValue | ((value: CheckboxInputValue) => CheckboxInputValue)) => void,
}
