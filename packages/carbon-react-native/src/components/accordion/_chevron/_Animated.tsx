import {
	useEffect,
	useRef,
} from 'react'

import {
	Animated as RNAnimated,
	type EasingFunction,
} from 'react-native'

import ChevronDown from '@carbon/icons/svg/32/chevron--down.svg'

import type {
	SvgProps,
} from 'react-native-svg'

import {
	Motion,
} from '../_motion'

const
	AnimatedSvgChevronDown =
		RNAnimated.createAnimatedComponent(ChevronDown)

interface AnimatedProps {
	open: boolean,
	color: string,
	size: number,
	style?: SvgProps['style'],
}

export function Animated({
	open,
	color,
	size,
	style,
}: AnimatedProps) {

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
						duration: Motion.toOpen.duration,
						easing: Motion.toOpen.easing as EasingFunction,
						useNativeDriver: true,
					},
				).start()
			} else {
				RNAnimated.timing(
					rotateZ.current,
					{
						toValue: 0,
						duration: Motion.toClose.duration,
						easing: Motion.toClose.easing as EasingFunction,
						useNativeDriver: true,
					},
				).start()
			}
		} else {
			isMounted.current = true
		}
	}, [
		open,
		rotateZ,
	])

	return (
		<AnimatedSvgChevronDown
			fill={ color }
			width={ size }
			height={ size }
			style={ [
				{
					transform: [{
						rotateZ: rotateZ.current.interpolate({
							inputRange: [0, 1],
							outputRange: ['0deg', '180deg'],
						}),
					}],
				},
				style,
			] }
		/>
	)

}
