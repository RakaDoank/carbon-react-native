import {
	StyleSheet,
} from "react-native"

export const { absolute } = StyleSheet.create({
	absolute: {
		position: "absolute",
	} as const,
})
export const { relative } = StyleSheet.create({
	relative: {
		position: "relative",
	} as const,
})
export const { static: static_ } = StyleSheet.create({
	/**
	 * Underscore added at the end because `static` is reserved word.
	 */
	static: {
		position: "static",
	} as const,
})
