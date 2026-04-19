import type {
	CollapsibleRefBase,
} from "../collapsible/CollapsibleRefBase"

export interface TableRowCollapsibleRefBase extends CollapsibleRefBase {
	/**
	 * This method does nothing if `open` component prop is defined
	 */
	setOpen: (value: boolean | ((value: boolean) => boolean)) => void,
}
