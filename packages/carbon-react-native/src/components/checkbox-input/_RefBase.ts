import type {
	CheckboxInputState,
} from "./CheckboxInputState"

export interface RefBase {
	readonly value: CheckboxInputState,
	/**
	 * This method does nothing when `controlled` prop is true
	 */
	setValue: (value: CheckboxInputState | ((value: CheckboxInputState) => CheckboxInputState)) => void,
}
