import {
	ColorHelper,
} from "../../../helpers"

let colorScheme = ColorHelper.getColorScheme()

export function get() {
	return colorScheme
}

export function set(scheme: typeof colorScheme) {
	colorScheme = scheme
}
