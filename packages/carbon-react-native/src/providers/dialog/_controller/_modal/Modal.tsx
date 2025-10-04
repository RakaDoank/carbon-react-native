import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
} from 'react'

import {
	StyleSheet,
} from 'react-native'

import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSequence,
	withTiming,
} from 'react-native-reanimated'

import {
	FlexStyleSheet,
} from '../../../../_internal/style-sheets'

import type {
	ModalProps,
} from './ModalProps'

import type {
	ModalRef,
} from './ModalRef'

export const Modal = forwardRef<ModalRef, ModalProps>(
	function Modal(
		{
			defaultAnimationConfig: animationConfig,
			style,
			...props
		},
		ref,
	) {

		const
			initialAnimation =
				useRef(false),

			/**
			 * 0 = unmounted
			 * 1 = mounted
			 * 2 = unmounted (behind of next dialog)
			 */
			interpolation =
				useSharedValue<0 | 1 | 2>(0),

			animatedStyle =
				useAnimatedStyle(() => {
					return animationConfig.modalAnimatedStyle(interpolation, [0, 1, 2])
				})

		useEffect(() => {
			if(!initialAnimation.current) {
				initialAnimation.current = true
				interpolation.value = withTiming(
					1,
					{
						duration: Array.isArray(animationConfig.duration)
							? animationConfig.duration[1]
							: animationConfig.duration,
						easing: Array.isArray(animationConfig.modalEasing)
							? animationConfig.modalEasing[1]
							: animationConfig.modalEasing,
					},
				)
			}
		}, [
			animationConfig,
			interpolation,
		])

		useImperativeHandle(ref, () => {
			return {
				toState(value) {
					return new Promise(resolve => {
						interpolation.value = withTiming(
							value,
							{
								duration: Array.isArray(animationConfig.duration)
									? animationConfig.duration[value]
									: animationConfig.duration,
								easing: Array.isArray(animationConfig.modalEasing)
									? animationConfig.modalEasing[value]
									: animationConfig.modalEasing,
							},
							function(finished) {
								if(finished) {
									runOnJS(resolve)()
								}
							},
						)
					})
				},
				fromToState(from, to) {
					return new Promise(resolve => {
						interpolation.value = withSequence(
							withTiming(from, { duration: 0 }),
							withTiming(
								to,
								{
									duration: Array.isArray(animationConfig.duration)
										? animationConfig.duration[to]
										: animationConfig.duration,
									easing: Array.isArray(animationConfig.modalEasing)
										? animationConfig.modalEasing[to]
										: animationConfig.modalEasing,
								},
								function(finished) {
									if(finished) {
										runOnJS(resolve)()
									}
								},
							),
						)
					})
				},
			}
		}, [
			animationConfig,
			interpolation,
		])

		return (
			<Animated.View
				{ ...props }
				style={ [
					StyleSheet.absoluteFill,
					FlexStyleSheet.items_center,
					FlexStyleSheet.justify_center,
					animatedStyle,
					style,
				] }
			/>
		)

	},
)
