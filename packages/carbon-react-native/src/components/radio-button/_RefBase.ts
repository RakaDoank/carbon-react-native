import type {
	RadioButtonInputRef,
} from '../radio-button-input/RadioButtonInputRef'

export interface RefBase {
	readonly checked: boolean,
	/**
	 * This method does nothing when `controlled` prop is true
	 */
	setChecked: RadioButtonInputRef['setChecked'],
}
