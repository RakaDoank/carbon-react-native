export interface ItemRefBase {
	readonly open: boolean,
	/**
	 * This method does nothing if `controlled` prop is true
	 */
	setOpen: (value: boolean | ((value: boolean) => boolean)) => void,
}
