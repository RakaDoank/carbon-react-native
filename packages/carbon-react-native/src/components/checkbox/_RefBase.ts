import type {
	CheckboxInputRef,
} from "../checkbox-input/CheckboxInputRef"

export interface RefBase {
	/**
	 * The current checked value.
	 * 
	 * Set this to new value will do nothing when the `checked` component prop is defined a.k.a controlled component.
	 */
	checked: CheckboxInputRef["checked"],
	/**
	 * This method does nothing if `checked` component prop is defined
	 * @deprecated The `checked` property is already a property accessors.
	 */
	setChecked: CheckboxInputRef["setChecked"],
}
