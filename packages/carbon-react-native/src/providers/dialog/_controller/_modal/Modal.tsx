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

import * as CarbonStyleSheet from "../../../../carbon-style-sheet"

import type {
	ModalProps,
} from "./ModalProps"

import type {
	ModalRef,
} from "./ModalRef"

export const Modal = forwardRef<ModalRef, ModalProps>(
	function(
		{
			animationConfig,
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
						useNativeDriver: animationConfig.useNativeDriver,
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
									useNativeDriver: animationConfig.useNativeDriver,
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
										useNativeDriver: animationConfig.useNativeDriver,
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
				/* eslint-disable react-hooks/refs */
				style={ [
					StyleSheet.absoluteFill,
					CarbonStyleSheet.g.items_center,
					CarbonStyleSheet.g.justify_center,
					animationConfig.modalStyleFactory(interpolation.current, interpolationInputRange),
					style,
				] }
				/* eslint-enable react-hooks/refs */
			/>
		)

	},
)

const
	interpolationInputRange =
		[0, 1, 2]
