import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
} from 'react'

import {
	Animated,
	StyleSheet,
} from 'react-native'

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

export const ModalAnimated = forwardRef<ModalRef, ModalProps>(
	function(
		{
			animatedConfig = DialogAnimationConfigs.Animated.CarbonReact,
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			reanimatedConfig,
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
				useRef(new Animated.Value(0))

		useEffect(() => {
			if(!initialAnimation.current) {
				initialAnimation.current = true
				Animated.timing(
					interpolation.current,
					{
						toValue: 1,
						duration: Array.isArray(animatedConfig.duration)
							? animatedConfig.duration[1]
							: animatedConfig.duration,
						easing: Array.isArray(animatedConfig.modalEasing)
							? animatedConfig.modalEasing[1]
							: animatedConfig.modalEasing,
						useNativeDriver: true,
					},
				).start()
			}
		}, [
			animatedConfig,
			interpolation,
		])

		useImperativeHandle(ref, () => {
			return {
				toState(value) {
					return new Promise(resolve => {
						Animated
							.timing(
								interpolation.current,
								{
									toValue: value,
									duration: Array.isArray(animatedConfig.duration)
										? animatedConfig.duration[value]
										: animatedConfig.duration,
									easing: Array.isArray(animatedConfig.modalEasing)
										? animatedConfig.modalEasing[value]
										: animatedConfig.modalEasing,
									useNativeDriver: true,
								},
							)
							.start(({ finished }) => {
								if(finished) {
									resolve()
								}
							})
					})
				},
				fromToState(from, to) {
					return new Promise(resolve => {
						Animated
							.sequence([
								Animated.timing(interpolation.current, { toValue: from, duration: 0, useNativeDriver: true }),
								Animated.timing(
									interpolation.current,
									{
										toValue: to,
										duration: Array.isArray(animatedConfig.duration)
											? animatedConfig.duration[to]
											: animatedConfig.duration,
										easing: Array.isArray(animatedConfig.modalEasing)
											? animatedConfig.modalEasing[to]
											: animatedConfig.modalEasing,
										useNativeDriver: true,
									},
								),
							])
							.start(({ finished }) => {
								if(finished) {
									resolve()
								}
							})
					})
				},
			}
		}, [
			animatedConfig,
			interpolation,
		])

		return (
			<Animated.View
				{ ...props }
				style={ [
					StyleSheet.absoluteFill,
					FlexStyleSheet.items_center,
					FlexStyleSheet.justify_center,
					animatedConfig.modalStyleFactory(interpolation.current, [0, 1, 2]),
					style,
				] }
			/>
		)

	},
)
