import {
	StyleSheet as RNStyleSheet,
} from "react-native"

import * as color from "./color"

import * as g from "./g"
import * as gObject from "./g-object"

export const absoluteFill = RNStyleSheet.absoluteFill
export const absoluteFillObject = RNStyleSheet.absoluteFillObject
export const flatten = RNStyleSheet.flatten
export const hairlineWidth = RNStyleSheet.hairlineWidth
export const setStyleAttributePreprocessor = RNStyleSheet.setStyleAttributePreprocessor

export {
	color,
	g,
	gObject,
}

export * from "./breakpoint"
export * from "./create"
export * from "./use"
