export  interface RadioButtonInputRefBase {
	/**
	 * The current checked value.
	 */
	readonly checked: boolean,
	/**
	 * This method does nothing if `checked` component prop is defined
	 */
	setChecked: (checked: boolean | ((checked: boolean) => boolean)) => void,
}
