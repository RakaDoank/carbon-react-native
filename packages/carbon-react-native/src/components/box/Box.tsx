import {
	forwardRef,
	useContext,
} from "react"

import {
	View,
} from "react-native"

import {
	GlobalConfigContext,
} from "../../_internal/contexts"

import * as CarbonStyleSheet from "../../carbon-style-sheet"

import type {
	BoxProps,
} from "./BoxProps"

import type {
	BoxRef,
} from "./BoxRef"

/**
 * This component is a basic React Native `View` to solve
 * RTL support for component level.
 * 
 * You may use this if your app provides custom localization options.
 */
export const Box = forwardRef<BoxRef, BoxProps>(
	function Box(
		{
			dir: dirProp,
			style,
			...props
		},
		ref,
	) {

		const
			globalConfigContext =
				useContext(GlobalConfigContext),

			dir =
				dirProp ??
				globalConfigContext.rtl ? "rtl" : "ltr"

		return (
			<View
				ref={ ref }
				{ ...props }
				dir={ dir }
				style={ [
					dir == "rtl" ? CarbonStyleSheet.g.rtl : undefined,
					style,
				] }
			/>
		)

	},
)
