import type {
	CheckboxInputRef,
} from "../checkbox-input/CheckboxInputRef"

export interface RefBase {
	readonly checked: CheckboxInputRef["checked"],
	/**
	 * This method does nothing when `controlled` prop is true
	 */
	setChecked: CheckboxInputRef["setChecked"],
}
