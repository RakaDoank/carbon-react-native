import type {
	SvgProps,
} from "react-native-svg"

import type {
	CollapsibleProps,
} from "../../../components/collapsible/CollapsibleProps"

export interface AnimatedCollapsibleChevronProps extends Omit<SvgProps, "fill"> {
	motion?: NonNullable<CollapsibleProps["motion"]>,
	open: boolean,
	color: string,
	size: number,
}
