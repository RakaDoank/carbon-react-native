export interface TableToolbarSwitcherRefBase {
	/**
	 * Does nothing if `next` prop is boolean
	 */
	next: () => void,
	/**
	 * Does nothing if `next` prop is boolean
	 */
	prev: () => void,
	/**
	 * Run either next or prev.
	 * 
	 * Does nothing if `next` prop is boolean
	 */
	switch: () => void,
}
