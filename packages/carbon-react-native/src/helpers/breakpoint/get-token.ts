import {
	Breakpoint,
	type BreakpointToken,
} from "@audira/carbon-react-native-elements"

export function getToken(
	windowWidth: number,
): BreakpointToken {
	return windowWidth < Breakpoint.medium.value.px ? (
		"small"
	) : windowWidth < Breakpoint.large.value.px ? (
		"medium"
	) : windowWidth < Breakpoint.x_large.value.px ? (
		"large"
	) : windowWidth < Breakpoint.max.value.px ? (
		"x_large"
	) : (
		"max"
	)
}
