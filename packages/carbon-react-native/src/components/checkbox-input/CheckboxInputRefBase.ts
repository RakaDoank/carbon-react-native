import type {
	CheckboxInputState,
} from "./CheckboxInputState"

export interface CheckboxInputRefBase {
	/**
	 * The current checked value.
	 */
	readonly checked: CheckboxInputState,
	/**
	 * This method does nothing if `checked` component prop is defined
	 */
	setChecked: (value: CheckboxInputState | ((value: CheckboxInputState) => CheckboxInputState)) => void,
}
