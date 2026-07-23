import {
	forwardRef,
	useContext,
	useEffect,
	useRef,
} from "react"

import {
	Animated,
	Easing,
} from "react-native"

import {
	Motion,
} from "@audira/carbon-react-native-elements"

import {
	ThemeContext,
} from "../../contexts"

import {
	LayerContext,
} from "../layer"

import type {
	LoadingProps,
} from "./LoadingProps"

import type {
	LoadingRef,
} from "./LoadingRef"

import {
	CircularProgress,
} from "./_circular-progress"

import {
	MapCircleBackgroundColor,
} from "./_map-circle-background-color"

import {
	MapCircleStrokeColor,
} from "./_map-circle-stroke-color"

export const Loading = forwardRef<LoadingRef, LoadingProps>(
	function(
		{
			type = "large",
			style,
			...props
		},
		ref,
	) {

		const
			layerContext =
				useContext(LayerContext),

			themeContext =
				useContext(ThemeContext),

			/**
			 * To animate degree unit, we have to animate it through interpolation
			 * 
			 * - 0 = 0deg
			 * - 1 = 360deg
			 */
			rotationValue =
				useRef(new Animated.Value(0))

		useEffect(() => {
			const loop = Animated.loop(
				Animated.timing(
					rotationValue.current,
					{
						toValue: 1,
						duration: Motion.Duration.slow_02,
						easing: Easing.linear,
						useNativeDriver: false,
					},
				),
				{
					iterations: -1,
				},
			)
			loop.start()
			return loop.stop
		}, [])

		return (
			<AnimatedCircularProgress
				forwardedRef={ ref }
				{ ...props }
				type={ type }
				circleStrokeColor={ MapCircleStrokeColor[themeContext.colorScheme] }
				circleBackgroundColor={ MapCircleBackgroundColor[layerContext][themeContext.colorScheme] }
				style={ [
					{
						transform: [{
							rotateZ: rotationValue.current.interpolate({
								inputRange: [0, 1],
								outputRange: ["0deg", "360deg"],
							}),
						}],
					},
					style,
				] }
			/>
		)

	},
)

const
	AnimatedCircularProgress =
		Animated.createAnimatedComponent(CircularProgress)
