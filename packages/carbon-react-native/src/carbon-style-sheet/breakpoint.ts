import type {
	BreakpointToken,
} from "@audira/carbon-react-native-elements"

/**
 * Use `Breakpoint` from the `carbon-react-native-elements` to get the actual value of each breakpoint.  
 * This is just a constant name.
 */
export const breakpoint =
	{
		small: "small",
		medium: "medium",
		large: "large",
		x_large: "x_large",
		max: "max",
	} as const satisfies Record<BreakpointToken, BreakpointToken>
