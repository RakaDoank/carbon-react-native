import type {
	CheckboxInputState,
} from "./CheckboxInputState"

export interface RefBase {
	/**
	 * The current checked value.
	 * 
	 * Set this to new value will do nothing when the `checked` component prop is defined a.k.a controlled component.
	 */
	checked: CheckboxInputState,
	/**
	 * This method does nothing if `checked` component prop is defined
	 * @deprecated The `checked` property is already a property accessors.
	 */
	setChecked: (value: CheckboxInputState | ((value: CheckboxInputState) => CheckboxInputState)) => void,
}
