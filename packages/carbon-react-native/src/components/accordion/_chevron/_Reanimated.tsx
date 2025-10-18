import {
	useEffect,
	useRef,
} from 'react'

import ChevronDown from '@carbon/icons/svg/32/chevron--down.svg'

import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'

import type {
	SvgProps,
} from 'react-native-svg'

import {
	Motion,
} from '../_motion'

const
	AnimatedSvgChevronDown =
		Animated.createAnimatedComponent(ChevronDown)

interface ReanimatedProps {
	open: boolean,
	color: string,
	size: number,
	style?: SvgProps['style'],
}

export function Reanimated({
	open,
	color,
	size,
	style,
}: ReanimatedProps) {

	const
		isMounted =
			useRef(false),

		rotateZ =
			useSharedValue(open ? 180 : 0),

		animatedStyle =
			useAnimatedStyle(() => {
				return {
					transform: [{
						rotateZ: `${rotateZ.value}deg`,
					}],
				}
			})

	useEffect(() => {
		if(isMounted.current) {
			if(open) {
				rotateZ.value =
					withTiming(
						180,
						Motion.toOpen,
					)
			} else {
				rotateZ.value =
					withTiming(
						0,
						Motion.toClose,
					)
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
				animatedStyle,
				style,
			] }
		/>
	)

}
