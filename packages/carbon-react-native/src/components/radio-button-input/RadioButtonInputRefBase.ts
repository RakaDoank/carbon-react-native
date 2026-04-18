export  interface RadioButtonInputRefBase {
	/**
	 * The current checked value.
	 * 
	 * Set this to new value will do nothing when the `checked` component prop is defined a.k.a controlled component.
	 */
	checked: boolean,
	/**
	 * This method does nothing if `checked` component prop is defined
	 * @deprecated The `checked` property is already a property accessors.
	 */
	setChecked: (checked: boolean | ((checked: boolean) => boolean)) => void,
}
