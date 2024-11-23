import {
	StyleSheet,
} from 'react-native'

import * as FontFamily from '../constants/typography/font-family'

export const TextStyle = StyleSheet.create({
	THIN: {
		fontFamily: FontFamily.THIN,
	},
	THIN_ITALIC: {
		fontFamily: FontFamily.THIN_ITALIC,
	},
	EXTRALIGHT: {
		fontFamily: FontFamily.EXTRALIGHT,
	},
	EXTRALIGHT_ITALIC: {
		fontFamily: FontFamily.EXTRALIGHT_ITALIC,
	},
	LIGHT: {
		fontFamily: FontFamily.LIGHT,
	},
	LIGHT_ITALIC: {
		fontFamily: FontFamily.LIGHT_ITALIC,
	},
	NORMAL: {
		fontFamily: FontFamily.NORMAL,
	},
	NORMAL_ITALIC: {
		fontFamily: FontFamily.NORMAL_ITALIC,
	},
	MEDIUM: {
		fontFamily: FontFamily.MEDIUM,
	},
	MEDIUM_ITALIC: {
		fontFamily: FontFamily.MEDIUM_ITALIC,
	},
	SEMIBOLD: {
		fontFamily: FontFamily.SEMIBOLD,
	},
	SEMIBOLD_ITALIC: {
		fontFamily: FontFamily.SEMIBOLD_ITALIC,
	},
	BOLD: {
		fontFamily: FontFamily.BOLD,
	},
	BOLD_ITALIC: {
		fontFamily: FontFamily.BOLD_ITALIC,
	},
})
