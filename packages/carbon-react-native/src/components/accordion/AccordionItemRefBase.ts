export interface AccordionItemRefBase {
	/**
	 * The current open value.
	 */
	readonly open: boolean,
	/**
	 * This method does nothing if `open` component prop is defined
	 */
	setOpen: (value: boolean | ((value: boolean) => boolean)) => void,
}
