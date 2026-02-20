import type {
	CheckboxInputState,
} from "./CheckboxInputState"

export interface RefBase {
	readonly checked: CheckboxInputState,
	/**
	 * This method does nothing when `controlled` prop is true
	 */
	setChecked: (value: CheckboxInputState | ((value: CheckboxInputState) => CheckboxInputState)) => void,
}
