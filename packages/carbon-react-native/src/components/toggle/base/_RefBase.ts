import type {
	SwitchRef,
} from "../../switch/SwitchRef"

export interface RefBase {
	/**
	 * The current value.
	 * 
	 * Set this to new value will do nothing when the `value` component prop is defined a.k.a controlled component.
	 */
	value: SwitchRef["value"],
	/**
	 * This method does nothing if `checked` component prop is defined
	 * @deprecated The `value` property is already a property accessors.
	 */
	setValue: SwitchRef["setValue"],
}
