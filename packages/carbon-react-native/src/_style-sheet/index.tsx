import {
	StyleSheet as RNStyleSheet,
} from 'react-native'

import {
	create as _create,
} from './create'

import {
	color as _color,
} from './color'

export namespace StyleSheet {

	export const create = _create

	export const color = _color

	export const absoluteFill = RNStyleSheet.absoluteFill

}
