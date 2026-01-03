import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
} from "react"

import {
	Animated,
	Easing,
	Platform,
	StyleSheet,
} from "react-native"

import {
	Motion,
	Spacing,
} from "@audira/carbon-react-native-elements"

import type {
	ComponentWrapperProps,
} from "./ComponentWrapperProps"

import type {
	ComponentWrapperRef,
} from "./ComponentWrapperRef"

export const ComponentWrapper = forwardRef<ComponentWrapperRef, ComponentWrapperProps>(
	function(
		{
			children,
			onLayout,
			onShiftedX,
			onShiftedY,
		},
		ref,
	) {

		const
			translateX =
				useRef(new Animated.Value(0)),

			translateXValueJS =
				useRef(0),

			translateY =
				useRef(new Animated.Value(0)),

			translateYValueJS =
				useRef(0)

		useEffect(() => {
			const
				translateX_ =
					translateX.current,

				translateY_ =
					translateY.current,

				translateXListenerID =
					translateX_.addListener(({ value }) => {
						translateXValueJS.current = value
					}),

				translateYListenerID =
					translateY_.addListener(({ value }) => {
						translateYValueJS.current = value
					})

			return () => {
				translateX_.removeListener(translateXListenerID)
				translateY_.removeListener(translateYListenerID)
			}
		}, [])

		useImperativeHandle(ref, () => {
			return {
				cancelX() {
					translateX.current?.stopAnimation()
				},
				cancelY() {
					translateY.current?.stopAnimation()
				},
				shiftX(px, delayMs = 0) {
					Animated.sequence([
						Animated.delay(delayMs),
						Animated.timing(
							translateX.current,
							{
								toValue: translateXValueJS.current + px,
								duration: Motion.Duration.moderate_01,
								easing,
								useNativeDriver: true,
							},
						),
					]).start(({ finished }) => {
						if(finished && onShiftedX) {
							onShiftedX()
						}
					})
				},
				shiftY(px) {
					Animated.timing(
						translateY.current,
						{
							toValue: translateYValueJS.current + px,
							duration: Motion.Duration.moderate_01,
							easing,
							useNativeDriver: true,
						},
					).start(({ finished }) => {
						if(finished && onShiftedY) {
							onShiftedY()
						}
					})
				},
			}
		}, [
			translateX,
			translateY,
			onShiftedX,
			onShiftedY,
		])

		return (
			<Animated.View
				onLayout={ onLayout as never }
				style={ [
					styleSheet.componentWrapper,
					{
						transform: [{
							translateX: translateX.current,
						}, {
							translateY: translateY.current,
						}],
					},
				] }
			>
				{ children }
			</Animated.View>
		)

	},
)

const
	styleSheet =
		StyleSheet.create({
			componentWrapper: {
				position: "absolute",
				top: Spacing.spacing_03,
				left: "100%",
				width: "auto",
				...Platform.select({
					web: {
						flexDirection: "row",
					},
				}),
			},
		}),

	easing =
		Easing.bezier(
			Motion.Easing.entrance.productive.x1,
			Motion.Easing.entrance.productive.y1,
			Motion.Easing.entrance.productive.x2,
			Motion.Easing.entrance.productive.y2,
		)
