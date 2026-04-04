import {
	useContext,
	useEffect,
	useMemo,
	useRef,
} from "react"

import {
	Animated,
	Easing,
	Platform,
	type View,
} from "react-native"

import {
	Motion,
} from "@audira/carbon-react-native-elements"

import * as CarbonStyleSheet from "../../carbon-style-sheet"

import {
	TableContext,
} from "../table/_TableContext"

import type {
	TableToolbarSwitcherProps,
} from "./TableToolbarSwitcherProps"

import type {
	AnimatedContentProps,
} from "./_AnimatedContentProps"

interface UseAnimatedContentProps extends AnimatedContentProps {
	size?: TableToolbarSwitcherProps["size"],
}

export function useAnimatedContent({
	size: sizeProp,
	visible,
}: UseAnimatedContentProps) {

	const
		tableContext =
			useContext(TableContext),

		heightPx =
			useMemo(() => {
				return mapHeightBySize[
					mapRowSizeToToolbarSize[sizeProp ?? tableContext.rowSize]
				]
			}, [
				sizeProp,
				tableContext.rowSize,
			]),

		ref =
			useRef({
				visible,
				heightPx,
			}),

		translateYAnimated =
			useRef(new Animated.Value(visible ? 0 : heightPx))

	useEffect(() => {
		if(ref.current.visible != visible) {
			ref.current.visible = visible

			const timingConfig = {
				duration: Motion.Duration.fast_02,
				easing: Easing.bezier(
					Motion.Easing.standard.productive.x1,
					Motion.Easing.standard.productive.y1,
					Motion.Easing.standard.productive.x2,
					Motion.Easing.standard.productive.y2,
				),
				useNativeDriver: Platform.OS != "web",
			}

			if(!visible) {
				Animated
					.timing(
						translateYAnimated.current,
						{
							toValue: heightPx,
							...timingConfig,
						},
					)
					.start()
			} else {
				Animated
					.sequence([
						Animated.timing(
							translateYAnimated.current,
							{
								toValue: heightPx,
								duration: 0,
								useNativeDriver: true,
							},
						),
						Animated.timing(
							translateYAnimated.current,
							{
								toValue: 0,
								...timingConfig,
							},
						),
					])
					.start()
			}
		}
	}, [
		heightPx,
		visible,
	])

	useEffect(() => {
		if(ref.current.heightPx != heightPx) {
			Animated
				.timing(
					translateYAnimated.current,
					{
						toValue: 1,
						duration: Motion.Duration.fast_02,
						easing: Easing.bezier(
							Motion.Easing.standard.productive.x1,
							Motion.Easing.standard.productive.y1,
							Motion.Easing.standard.productive.x2,
							Motion.Easing.standard.productive.y2,
						),
						useNativeDriver: Platform.OS != "web",
					},
				)
				.start()
		}
	}, [
		heightPx,
	])

	return {

		style: [
			!visible ? [CarbonStyleSheet.g.absolute, CarbonStyleSheet.g.w_full] : undefined,
			{
				transform: [{
					// eslint-disable-next-line react-hooks/refs
					translateY: translateYAnimated.current,
				}],
				// eslint-disable-next-line react-hooks/refs
				opacity: translateYAnimated.current.interpolate({
					inputRange: [0, heightPx],
					outputRange: [1, 0],
				}),
			},
		],

	} as const satisfies {

		style: Animated.ComponentProps<View>["style"],

	}

}

const
	mapHeightBySize =
		{
			small: 32,
			large: 48,
		} as const satisfies Record<NonNullable<UseAnimatedContentProps["size"]>, number>,

	mapRowSizeToToolbarSize =
		{
			extra_small: "small",
			small: "small",
			medium: "small",
			large: "large",
			extra_large: "large",
		} as const satisfies Record<TableContext["rowSize"], NonNullable<UseAnimatedContentProps["size"]>>
