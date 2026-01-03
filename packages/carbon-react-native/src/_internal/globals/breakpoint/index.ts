import type {
	BreakpointToken,
} from "@audira/carbon-react-native-elements"

let breakpoint: BreakpointToken

export function get() {
	return breakpoint
}

export function set(breakpoint_: BreakpointToken) {
	breakpoint = breakpoint_
}
