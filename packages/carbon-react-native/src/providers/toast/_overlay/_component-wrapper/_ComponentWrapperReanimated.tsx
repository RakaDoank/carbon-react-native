import {
	forwardRef,
	useImperativeHandle,
} from 'react'

import {
	Motion,
} from '@audira/carbon-react-native-elements'

import Animated, {
	Easing,
	cancelAnimation,
	runOnJS,
	runOnUI,
	useSharedValue,
	withDelay,
	withTiming,
} from 'react-native-reanimated'

import type {
	ComponentWrapperProps,
} from './ComponentWrapperProps'

import type {
	ComponentWrapperRef,
} from './ComponentWrapperRef'

import {
	Style,
} from './_style'

export const ComponentWrapperReanimated = forwardRef<ComponentWrapperRef, ComponentWrapperProps>(
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
				useSharedValue(0),

			translateY =
				useSharedValue(0)

		useImperativeHandle(ref, () => {
			return {
				cancelX() {
					runOnUI(() => cancelAnimation(translateX))()
				},
				cancelY() {
					runOnUI(() => cancelAnimation(translateY))()
				},
				shiftX(px_, delayMs_ = 0) {
					runOnUI((px: number, delayMs: number) => {
						translateX.value = withDelay(delayMs, withTiming(
							translateX.value + px,
							{
								duration: Motion.Duration.moderate_01,
								easing,
							},
							finished => {
								if(finished && onShiftedX) {
									runOnJS(onShiftedX)()
								}
							},
						))
					})(px_, delayMs_)
				},
				shiftY(px_) {
					runOnUI((px: number) => {
						translateY.value = withTiming(
							translateY.value + px,
							{
								duration: Motion.Duration.moderate_01,
								easing,
							},
							finished => {
								if(finished && onShiftedY) {
									runOnJS(onShiftedY)()
								}
							},
						)
					})(px_)
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
					Style.componentWrapper,
					{
						transform: [{
							translateX: translateX,
						}, {
							translateY: translateY,
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
	easing =
		Easing.bezier(
			Motion.Easing.entrance.productive.x1,
			Motion.Easing.entrance.productive.y1,
			Motion.Easing.entrance.productive.x2,
			Motion.Easing.entrance.productive.y2,
		)
