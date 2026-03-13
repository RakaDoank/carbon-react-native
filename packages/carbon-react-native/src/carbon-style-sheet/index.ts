import {
	StyleSheet as RNStyleSheet,
} from "react-native"

import * as g from "./g"
import * as gObject from "./g-object"

export const absoluteFill = RNStyleSheet.absoluteFill
export const absoluteFillObject = RNStyleSheet.absoluteFillObject
export const flatten = RNStyleSheet.flatten
export const hairlineWidth = RNStyleSheet.hairlineWidth
export const setStyleAttributePreprocessor = RNStyleSheet.setStyleAttributePreprocessor

export {
	g,
	gObject,
}

export * from "./breakpoint"
export * from "./color"
export * from "./create"
export * from "./use"
