export interface AccordionItemRefBase {
	/**
	 * The current open value.
	 * 
	 * Set this to new value will do nothing when the `open` component prop is defined a.k.a controlled component.
	 */
	open: boolean,
	/**
	 * This method does nothing if `open` component prop is defined
	 * @deprecated The `open` property is already a property accessors.
	 */
	setOpen: (value: boolean | ((value: boolean) => boolean)) => void,
}
