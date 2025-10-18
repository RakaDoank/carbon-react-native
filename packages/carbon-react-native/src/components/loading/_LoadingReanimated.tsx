import {
	forwardRef,
	useContext,
	useEffect,
} from 'react'

import {
	Motion,
} from '@audira/carbon-react-native-elements'

import Animated, {
	Easing,
	cancelAnimation,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from 'react-native-reanimated'

import {
	ThemeContext,
} from '../../contexts'

import {
	LayerContext,
} from '../layer'

import type {
	LoadingProps,
} from './LoadingProps'

import type {
	LoadingRef,
} from './LoadingRef'

import {
	CircularProgress,
} from './_circular-progress'

import {
	MapCircleBackgroundColor,
} from './_map-circle-background-color'

import {
	MapCircleStrokeColor,
} from './_map-circle-stroke-color'

export const LoadingReanimated = forwardRef<LoadingRef, LoadingProps>(
	function(
		{
			type = 'large',
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

			rotationValue =
				useSharedValue(0),

			animatedStyle =
				useAnimatedStyle(() => {
					return {
						transform: [{
							rotateZ: `${rotationValue.value}deg`,
						}],
					}
				})

		useEffect(() => {
			rotationValue.value = withRepeat(
				withTiming(
					360,
					{
						duration: Motion.Duration.slow_02,
						easing: Easing.linear,
					},
				),
				0,
			)
			return () => {
				cancelAnimation(rotationValue)
			}
		}, [
			rotationValue,
		])

		return (
			<AnimatedCircularProgress
				forwardedRef={ ref }
				{ ...props }
				type={ type }
				circleStrokeColor={ MapCircleStrokeColor[themeContext.colorScheme] }
				circleBackgroundColor={ MapCircleBackgroundColor[layerContext][themeContext.colorScheme] }
				style={ [
					animatedStyle,
					style,
				] }
			/>
		)

	},
)

const
	AnimatedCircularProgress =
		Animated.createAnimatedComponent(CircularProgress)
