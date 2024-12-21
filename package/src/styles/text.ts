import {
	StyleSheet,
} from 'react-native'

import {
	FontFamily,
} from '../constants/typography/font-family'

export const TextStyle = StyleSheet.create({
	thin: {
		fontWeight: 100,
		fontFamily: FontFamily.THIN,
	},
	thin_italic: {
		fontWeight: 100,
		fontFamily: FontFamily.THIN_ITALIC,
	},
	extralight: {
		fontWeight: 200,
		fontFamily: FontFamily.EXTRALIGHT,
	},
	extralight_italic: {
		fontWeight: 200,
		fontFamily: FontFamily.EXTRALIGHT_ITALIC,
	},
	light: {
		fontWeight: 300,
		fontFamily: FontFamily.LIGHT,
	},
	light_italic: {
		fontWeight: 300,
		fontFamily: FontFamily.LIGHT_ITALIC,
	},
	normal: {
		fontWeight: 400,
		fontFamily: FontFamily.NORMAL,
	},
	normal_italic: {
		fontWeight: 400,
		fontFamily: FontFamily.NORMAL_ITALIC,
	},
	medium: {
		fontWeight: 500,
		fontFamily: FontFamily.MEDIUM,
	},
	medium_italic: {
		fontWeight: 500,
		fontFamily: FontFamily.MEDIUM_ITALIC,
	},
	semibold: {
		fontWeight: 600,
		fontFamily: FontFamily.SEMIBOLD,
	},
	semibold_italic: {
		fontWeight: 600,
		fontFamily: FontFamily.SEMIBOLD_ITALIC,
	},
	bold: {
		fontWeight: 700,
		fontFamily: FontFamily.BOLD,
	},
	bold_italic: {
		fontWeight: 700,
		fontFamily: FontFamily.BOLD_ITALIC,
	},
})
