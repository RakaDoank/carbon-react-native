import {
	forwardRef,
	useContext,
} from "react"

import {
	ScrollView as ReactNativeScrollView,
} from "react-native"

import {
	GlobalConfigContext,
} from "../../_internal/contexts"

import * as CarbonStyleSheet from "../../carbon-style-sheet"

import type {
	ScrollViewProps,
} from "./ScrollViewProps"

/**
 * This component is a basic React Native `ScrollView` to solve
 * RTL support for component level.
 * 
 * You may use this if your app provides custom localization options.
 */
export const ScrollView = forwardRef<ReactNativeScrollView, ScrollViewProps>(
	function ScrollView(
		{
			dir: dirProp,
			style,
			contentContainerStyle,
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
			<ReactNativeScrollView
				ref={ ref }
				{ ...props }
				dir={ dir }
				style={ [
					dir == "rtl" ? CarbonStyleSheet.g.rtl : undefined,
					style,
				] }
				contentContainerStyle={ [
					dir == "rtl" ? CarbonStyleSheet.g.rtl : undefined,
					contentContainerStyle,
				] }
			/>
		)

	},
) as unknown as typeof ReactNativeScrollView & ReactNativeScrollView
