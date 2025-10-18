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

import {
	DialogAnimationConfigs,
} from '../../../../const'

import type {
	ModalProps,
} from './ModalProps'

import type {
	ModalRef,
} from './ModalRef'

export const ModalReanimated = forwardRef<ModalRef, ModalProps>(
	function(
		{
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			animatedConfig,
			reanimatedConfig = DialogAnimationConfigs.Reanimated.CarbonReact,
			style,
			...props
		},
		ref,
	) {

		const
			initialAnimation =
				useRef(false),

			/**
			 * - 0 = unmounted
			 * - 1 = mounted
			 * - 2 = hidden behind of next dialog
			 */
			interpolation =
				useSharedValue<0 | 1 | 2>(0),

			animatedStyle =
				useAnimatedStyle(() => {
					return reanimatedConfig.modalStyleFactory(interpolation, [0, 1, 2])
				})

		useEffect(() => {
			if(!initialAnimation.current) {
				initialAnimation.current = true
				interpolation.value = withTiming(
					1,
					{
						duration: Array.isArray(reanimatedConfig.duration)
							? reanimatedConfig.duration[1]
							: reanimatedConfig.duration,
						easing: Array.isArray(reanimatedConfig.modalEasing)
							? reanimatedConfig.modalEasing[1]
							: reanimatedConfig.modalEasing,
					},
				)
			}
		}, [
			reanimatedConfig,
			interpolation,
		])

		useImperativeHandle(ref, () => {
			return {
				toState(value) {
					return new Promise(resolve => {
						interpolation.value = withTiming(
							value,
							{
								duration: Array.isArray(reanimatedConfig.duration)
									? reanimatedConfig.duration[value]
									: reanimatedConfig.duration,
								easing: Array.isArray(reanimatedConfig.modalEasing)
									? reanimatedConfig.modalEasing[value]
									: reanimatedConfig.modalEasing,
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
									duration: Array.isArray(reanimatedConfig.duration)
										? reanimatedConfig.duration[to]
										: reanimatedConfig.duration,
									easing: Array.isArray(reanimatedConfig.modalEasing)
										? reanimatedConfig.modalEasing[to]
										: reanimatedConfig.modalEasing,
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
			reanimatedConfig,
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
