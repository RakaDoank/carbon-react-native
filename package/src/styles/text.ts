import {
	StyleSheet,
} from 'react-native'

import {
	FontFamily,
} from '../constants/typography/font-family'

export const TextStyle = StyleSheet.create({
	thin: {
		fontWeight: 100,
		fontFamily: FontFamily.thin,
	},
	thin_italic: {
		fontWeight: 100,
		fontFamily: FontFamily.thin_italic,
	},
	extralight: {
		fontWeight: 200,
		fontFamily: FontFamily.extralight,
	},
	extralight_italic: {
		fontWeight: 200,
		fontFamily: FontFamily.extralight_italic,
	},
	light: {
		fontWeight: 300,
		fontFamily: FontFamily.light,
	},
	light_italic: {
		fontWeight: 300,
		fontFamily: FontFamily.light_italic,
	},
	normal: {
		fontWeight: 400,
		fontFamily: FontFamily.normal,
	},
	normal_italic: {
		fontWeight: 400,
		fontFamily: FontFamily.normal_italic,
	},
	medium: {
		fontWeight: 500,
		fontFamily: FontFamily.medium,
	},
	medium_italic: {
		fontWeight: 500,
		fontFamily: FontFamily.medium_italic,
	},
	semibold: {
		fontWeight: 600,
		fontFamily: FontFamily.semibold,
	},
	semibold_italic: {
		fontWeight: 600,
		fontFamily: FontFamily.semibold_italic,
	},
	bold: {
		fontWeight: 700,
		fontFamily: FontFamily.bold,
	},
	bold_italic: {
		fontWeight: 700,
		fontFamily: FontFamily.bold_italic,
	},
})
