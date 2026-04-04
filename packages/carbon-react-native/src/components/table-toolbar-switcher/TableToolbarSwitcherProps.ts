import type {
	TableToolbarProps,
} from "../table-toolbar/TableToolbarProps"

export interface TableToolbarSwitcherProps extends TableToolbarProps {
	/**
	 * true indicates the `nextContent` will be showed and the `TableToolbar` will be hidden
	 */
	defaultNext?: boolean,
	/**
	 * true indicates the `nextContent` will be showed and the `TableToolbar` will be hidden
	 */
	next?: boolean,
	/**
	 * This is other views that you want to render if `defaultNext` or `next` is true.
	 */
	nextContent: React.ReactNode,
}
