export  interface RefBase {
	readonly checked: boolean,
	/**
	 * This method does nothing if `controlled` prop is true
	 */
	setChecked: (checked: boolean | ((checked: boolean) => boolean)) => void,
}
