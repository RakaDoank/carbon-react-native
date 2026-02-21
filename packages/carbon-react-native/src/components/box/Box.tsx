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

import {
	DirectionStyleSheet,
} from "../../style-sheets"

import type {
	BoxProps,
} from "./BoxProps"

import type {
	BoxRef,
} from "./BoxRef"

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
					dir == "rtl" ? DirectionStyleSheet.rtl : undefined,
					style,
				] }
			/>
		)

	},
)
