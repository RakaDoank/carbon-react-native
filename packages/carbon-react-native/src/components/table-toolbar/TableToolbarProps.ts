import type {
	ScrollViewProps,
} from "react-native"

import type {
	TableToolbarSize,
} from "./TableToolbarSize"

export interface TableToolbarProps extends ScrollViewProps {
	/**
	 * Based on the IBM spec, the `large` toolbar is paired with the extra large and large row sizes.
	 * The `small` toolbar is paired with the small and extra small row sizes.
	 * 
	 * You may don't want to set the toolbar size manually.
	 * Prefer to opt `rowSize` in the `Table` prop instead,
	 * and the toolbar size will be adjusted automatically based on what the row size is.
	 * 
	 * @default "large"
	 */
	size?: TableToolbarSize,
	/**
	 * Provide one or multiple `<TableToolbarButton>` in this prop.
	 * 
	 * To provide multiple buttons, you can start it with `<>` or `<Fragment>`
	 */
	buttons: React.ReactNode,
}
