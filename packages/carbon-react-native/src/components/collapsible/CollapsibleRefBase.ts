export interface CollapsibleRefBase {
	/**
	 * The current open value.
	 * 
	 * Set this to new value will do nothing when the `open` component prop is defined a.k.a controlled component.
	 */
	readonly open: boolean,
}
