import {
	useEffect,
	useRef,
} from "react"

import {
	Animated as RNAnimated,
	Easing,
	type EasingFunction,
} from "react-native"

import {
	Motion,
} from "@audira/carbon-react-native-elements"

import ChevronDown from "@carbon/icons/svg/32/chevron--down.svg"

import type {
	AnimatedCollapsibleChevronProps,
} from "./AnimatedCollapsibleChevronProps"

const
	AnimatedSvgChevronDown =
		RNAnimated.createAnimatedComponent(ChevronDown)

export function AnimatedCollapsibleChevron({
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
	open,
	color,
	size,
	style,
	...props
}: AnimatedCollapsibleChevronProps) {

	const
		isMounted =
			useRef(false),

		/**
		 * To animate degree unit, we have to animate it through interpolation
		 * 
		 * - 0 = 0deg (original)
		 * - 1 = 180deg (become to chevron up)
		 */
		rotateZ =
			useRef(
				new RNAnimated.Value(open ? 1 : 0),
			)

	useEffect(() => {
		if(isMounted.current) {
			if(open) {
				RNAnimated.timing(
					rotateZ.current,
					{
						toValue: 1,
						duration: motion.toOpen.duration,
						easing: motion.toOpen.easing as EasingFunction,
						useNativeDriver: true,
					},
				).start()
			} else {
				RNAnimated.timing(
					rotateZ.current,
					{
						toValue: 0,
						duration: motion.toClose.duration,
						easing: motion.toClose.easing as EasingFunction,
						useNativeDriver: true,
					},
				).start()
			}
		} else {
			isMounted.current = true
		}
	}, [
		motion,
		open,
		rotateZ,
	])

	return (
		<AnimatedSvgChevronDown
			{ ...props }
			fill={ color }
			width={ size }
			height={ size }
			style={ [
				/* eslint-disable react-hooks/refs */
				{
					transform: [{
						rotateZ: rotateZ.current.interpolate({
							inputRange: [0, 1],
							outputRange: ["0deg", "180deg"],
						}),
					}],
				},
				/* eslint-enable react-hooks/refs */
				style,
			] }
		/>
	)

}
