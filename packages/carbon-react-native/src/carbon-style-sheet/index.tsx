import {
	StyleSheet as RNStyleSheet,
} from 'react-native'

import {
	breakpoint as _breakpoint,
} from './breakpoint'

import {
	color as _color,
} from './color'

import {
	create as _create,
} from './create'

import {
	use as _use,
} from './use'

export namespace CarbonStyleSheet {

	export const absoluteFill = RNStyleSheet.absoluteFill

	export const absoluteFillObject = RNStyleSheet.absoluteFillObject

	export const compose = RNStyleSheet.compose

	/**
	 * This is a namespace for breakpoint constant names for the StyleSheet.create()  
	 * Use `Breakpoint` from the `carbon-react-native-elements` to get the actual breakpoint value instead
	 */
	export const breakpoint = _breakpoint

	/**
	 * This is a namespace for color constant names for the StyleSheet.create()  
	 * Use `Color` from the `carbon-react-native-elements` to get the actual color value instead
	 */
	export const color = _color

	export const create = _create

	export const flatten = RNStyleSheet.flatten

	export const hairlineWidth = RNStyleSheet.hairlineWidth

	export const setStyleAttributePreprocessor = RNStyleSheet.setStyleAttributePreprocessor

	export const use = _use

}
