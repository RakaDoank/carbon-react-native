export interface RefBase {
	/**
	 * This method does nothing when `controlled` prop is true
	 */
	setOpen: (value: boolean | ((value: boolean) => boolean)) => void,
}
