export interface RefBase {
	/**
	 * The current value.
	 * 
	 * Set this to new value will do nothing when the `value` component prop is defined a.k.a controlled component.
	 */
	value: boolean,
	/**
	 * This method does nothing if `value` component prop is defined
	 * @deprecated The `value` property is already a property accessors.
	 */
	setValue: (value: boolean | ((currentValue: boolean) => boolean)) => void,
}
