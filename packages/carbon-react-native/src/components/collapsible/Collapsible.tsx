import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react"

import {
	Animated,
	Easing,
	View,
	type EasingFunction,
	type ViewProps,
} from "react-native"

import {
	Motion,
} from "@audira/carbon-react-native-elements"

import * as CarbonStyleSheet from "../../carbon-style-sheet"

import type {
	CollapsibleProps,
} from "./CollapsibleProps"

import type {
	CollapsibleRef,
} from "./CollapsibleRef"

import type {
	CollapsibleRefBase,
} from "./CollapsibleRefBase"

export const Collapsible = forwardRef<CollapsibleRef, CollapsibleProps>(
	function(
		{
			open,
			motion = {
				toOpen: {
					duration: Motion.Duration.fast_02,
					easing: Easing.bezier(
						Motion.Easing.entrance.productive.x1,
						Motion.Easing.entrance.productive.y1,
						Motion.Easing.entrance.productive.x2,
						Motion.Easing.entrance.productive.y2,
					),
				},
				toClose: {
					duration: Motion.Duration.fast_02,
					easing: Easing.bezier(
						Motion.Easing.exit.productive.x1,
						Motion.Easing.exit.productive.y1,
						Motion.Easing.exit.productive.x2,
						Motion.Easing.exit.productive.y2,
					),
				},
			},
			children,
			style,
			contentContainerProps,
			onToggle,
			onOpened,
			onClosed,
			...props
		},
		forwardedRef,
	) {

		const
			viewRef =
				useRef<View>(null),

			ref =
				useRef<{
					/**
					 * To compare `positionView` value to avoid unnecessary set state with the same value
					 */
					positionView: "absolute" | "relative",
					contentHeight: number,
				}>({
					positionView: open ? "relative" : "absolute",
					contentHeight: 0,
				}),

			/**
			 * Absolute position is required to keep content being rendered as it is when the container is not open (zero height)  
			 *
			 * We need 'relative' position when the collapsible is initially opened due to heightAnimated initial value is zero and only will be calculated after content is rendered  
			 *
			 * This state will be changed once only from 'relative' to 'absolute'  
			 */
			[positionView, setPositionView] =
				useState<"absolute" | "relative">(
					ref.current.positionView,
				),

			heightAnimated =
				useRef(new Animated.Value(0)),

			/**
			 * - 0 -> Closed
			 * - 1 -> Opened
			 */
			contentContainerAnimated =
				useRef(new Animated.Value(0)),

			setPositionViewToAbsolute =
				useCallback(() => {
					if(ref.current.positionView === "relative") {
						ref.current.positionView = "absolute"
						setPositionView("absolute")
					}
				}, []),

			onLayoutContent: NonNullable<ViewProps["onLayout"]> =
				useCallback(({ nativeEvent }) => {
					if(ref.current.contentHeight !== nativeEvent.layout.height) {
						ref.current.contentHeight = nativeEvent.layout.height
						if(open) {
							Animated.timing(
								heightAnimated.current,
								{
									toValue: ref.current.contentHeight,
									duration: 0,
									useNativeDriver: false,
								},
							).start(setPositionViewToAbsolute)
						}
					}
				}, [
					heightAnimated,
					open,
					setPositionViewToAbsolute,
				])

		useEffect(() => {
			if(ref.current.contentHeight) {
				if(open) {
					Animated.timing(
						heightAnimated.current,
						{
							toValue: ref.current.contentHeight,
							useNativeDriver: false,
							duration: motion.toOpen.duration,
							easing: motion.toOpen.easing as EasingFunction,
						},
					).start(({ finished }) => {
						if(finished && onOpened) {
							onOpened()
						}
					})
					Animated.timing(
						contentContainerAnimated.current,
						{
							toValue: 1,
							duration: motion.toOpen.duration,
							easing: motion.toOpen.easing as EasingFunction,
							useNativeDriver: false,
						},
					).start()
				} else {
					Animated.timing(
						heightAnimated.current,
						{
							toValue: 0,
							duration: motion.toClose.duration,
							easing: motion.toClose.easing as EasingFunction,
							useNativeDriver: false,
						},
					).start(({ finished }) => {
						if(finished && onClosed) {
							onClosed()
						}
					})
					Animated.timing(
						contentContainerAnimated.current,
						{
							toValue: 0,
							duration: motion.toClose.duration,
							easing: motion.toClose.easing as EasingFunction,
							useNativeDriver: false,
						},
					).start()
				}
				onToggle?.(!!open)
			}
		}, [
			open,
			heightAnimated,
			contentContainerAnimated,
			motion,
			onToggle,
			onOpened,
			onClosed,
		])

		useImperativeHandle(forwardedRef, () => {
			return Object.assign<View, CollapsibleRefBase>(
				viewRef.current as View,
				{
					get open() {
						return !!open
					},
				},
			)
		}, [
			open,
		])

		return (
			<Animated.View
				{ ...props }
				style={ [
					CarbonStyleSheet.g.overflow_hidden,
					positionView === "absolute"
						? {
							height: heightAnimated.current,
						}
						: null,
					style,
				] }
				ref={ viewRef }
			>
				<View
					style={ [
						CarbonStyleSheet.g.w_full,
						{
							position: positionView,
						},
					] }
				>
					<Animated.View
						{ ...contentContainerProps }
						style={ [
							CarbonStyleSheet.g.flex_initial,
							{
								opacity: contentContainerAnimated.current.interpolate({
									inputRange: contentContainerInterpolationRange as unknown as number[],
									outputRange: [0, 1],
								}),
								transform: [{
									translateY: contentContainerAnimated.current.interpolate({
										inputRange: contentContainerInterpolationRange as unknown as number[],
										outputRange: [-12, 0],
									}),
								}],
							},
							contentContainerProps?.style,
						] }
						onLayout={ onLayoutContent }
					>
						{ children }
					</Animated.View>
				</View>
			</Animated.View>
		)

	},
)

const contentContainerInterpolationRange = [0, 1] as const
