import type {
	TextStyle,
} from "react-native"

export const Font = {
	thin: {
		fontWeight: 100,
		fontFamily: "IBMPlexSans-Thin",
	},
	thin_italic: {
		fontWeight: 100,
		fontFamily: "IBMPlexSans-Thin-Italic",
	},
	extralight: {
		fontWeight: 200,
		fontFamily: "IBMPlexSans-ExtraLight",
	},
	extralight_italic: {
		fontWeight: 200,
		fontFamily: "IBMPlexSans-ExtraLight-Italic",
	},
	light: {
		fontWeight: 300,
		fontFamily: "IBMPlexSans-Light",
	},
	light_italic: {
		fontWeight: 300,
		fontFamily: "IBMPlexSans-Light-Italic",
	},
	normal: {
		fontWeight: 400,
		fontFamily: "IBMPlexSans-Regular",
	},
	normal_italic: {
		fontWeight: 400,
		fontFamily: "IBMPlexSans-Italic",
	},
	medium: {
		fontWeight: 500,
		fontFamily: "IBMPlexSans-Medium",
	},
	medium_italic: {
		fontWeight: 500,
		fontFamily: "IBMPlexSans-Medium-Italic",
	},
	semibold: {
		fontWeight: 600,
		fontFamily: "IBMPlexSans-SemiBold",
	},
	semibold_italic: {
		fontWeight: 600,
		fontFamily: "IBMPlexSans-SemiBold-Italic",
	},
	bold: {
		fontWeight: 700,
		fontFamily: "IBMPlexSans-Bold",
	},
	bold_italic: {
		fontWeight: 700,
		fontFamily: "IBMPlexSans-Bold-Italic",
	},
} as const satisfies Record<string, TextStyle>
