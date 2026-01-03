import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
} from "react"

import {
	Animated,
	StyleSheet,
} from "react-native"

import {
	FlexStyleSheet,
} from "../../../../_internal/style-sheets"

import {
	DialogAnimationConfigs,
} from "../../../../const"

import type {
	ModalProps,
} from "./ModalProps"

import type {
	ModalRef,
} from "./ModalRef"

export const Modal = forwardRef<ModalRef, ModalProps>(
	function(
		{
			animationConfig = DialogAnimationConfigs.CarbonReact,
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
						duration: Array.isArray(animationConfig.duration)
							? animationConfig.duration[1]
							: animationConfig.duration,
						easing: Array.isArray(animationConfig.modalEasing)
							? animationConfig.modalEasing[1]
							: animationConfig.modalEasing,
						useNativeDriver: true,
					},
				).start()
			}
		}, [
			animationConfig,
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
									duration: Array.isArray(animationConfig.duration)
										? animationConfig.duration[value]
										: animationConfig.duration,
									easing: Array.isArray(animationConfig.modalEasing)
										? animationConfig.modalEasing[value]
										: animationConfig.modalEasing,
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
										duration: Array.isArray(animationConfig.duration)
											? animationConfig.duration[to]
											: animationConfig.duration,
										easing: Array.isArray(animationConfig.modalEasing)
											? animationConfig.modalEasing[to]
											: animationConfig.modalEasing,
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
					animationConfig.modalStyleFactory(interpolation.current, interpolationInputRange),
					style,
				] }
			/>
		)

	},
)

const
	interpolationInputRange =
		[0, 1, 2]
