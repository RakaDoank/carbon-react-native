import {
	StyleSheet,
} from "react-native"

export const { ltr } = StyleSheet.create({
	ltr: {
		direction: "ltr",
	} as const,
})

export const { rtl } = StyleSheet.create({
	rtl: {
		direction: "rtl",
	} as const,
})
