import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
} from 'react'

import {
	type View,
} from 'react-native'

import Animated, {
	runOnJS,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'

import {
	CarbonStyleSheet,
} from '../../../../carbon-style-sheet'

import type {
	OverlayProps,
} from './OverlayProps'

import type {
	OverlayRef,
} from './OverlayRef'

import type {
	OverlayRefBase,
} from './_OverlayRefBase'

export const Overlay = forwardRef<OverlayRef, OverlayProps>(
	function Overlay(
		{
			// type,
			defaultAnimationConfig,
			style,
			...props
		},
		ref,
	) {

		const
			viewRef =
				useRef<View>(null),

			opacityRef =
				useRef(0),

			/**
			 * 0 = unmounted
			 * 1 = mounted
			 */
			opacity =
				useSharedValue(0)

		useEffect(() => {
			if(opacityRef.current == 0) {
				opacityRef.current = 1
				opacity.value = withTiming(1, {
					duration: defaultAnimationConfig.duration,
				})
			}
		}, [
			defaultAnimationConfig,
			opacity,
		])

		useImperativeHandle(ref, () => {
			return Object.assign<View, OverlayRefBase>(
				viewRef.current ?? {} as View,
				{
					animateUnmount() {
						return new Promise(resolve => {
							opacityRef.current = 0
							opacity.value = withTiming(
								0,
								{
									duration: defaultAnimationConfig.duration,
								},
								function(finished) {
									if(finished) {
										runOnJS(resolve)()
									}
								},
							)
						})
					},
				},
			)
		}, [
			defaultAnimationConfig,
			opacity,
		])

		return (
			<Animated.View
				ref={ viewRef }
				{ ...props }
				style={ [
					styleSheet.overlay,
					{ opacity },
					style,
				] }
			/>
		)

	},
)

const
	styleSheet =
		CarbonStyleSheet.create({
			overlay: {
				backgroundColor: CarbonStyleSheet.color.overlay,
				position: 'absolute',
				top: 0,
				right: 0,
				bottom: 0,
				left: 0,
				overflow: 'hidden',
			},
		})
