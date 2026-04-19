import {
	Platform,
} from "react-native"

export const invisible = Platform.select({
	web: {
		visibility: "hidden",
	} as const,
	default: {
		opacity: 0,
		pointerEvents: "none",
	} as const,
})

export const visible = Platform.select({
	web: {
		visibility: "visible",
	} as const,
	default: {
		opacity: 1,
		pointerEvents: "auto",
	} as const,
})
