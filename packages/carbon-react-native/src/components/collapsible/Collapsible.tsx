import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from 'react'

import {
	View,
} from 'react-native'

import Animated, {
	Easing,
	interpolate,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'

import {
	Motion,
} from '@audira/carbon-react-native-elements'

import {
	CommonStyle,
	FlexStyle,
} from '../../styles'

import type {
	AnimatedViewProps,
} from './_AnimatedViewProps'

import type {
	RefBase,
} from './_RefBase'

import type {
	CollapsibleProps,
} from './CollapsibleProps'

import type {
	CollapsibleRef,
} from './CollapsibleRef'

export const Collapsible = forwardRef<CollapsibleRef, CollapsibleProps>(
	function Collapsible(
		{
			defaultOpen,
			open: openProp,
			motion = {
				toOpen: {
					duration: Motion.Duration.fast_02,
					easing: Easing.bezier(
						Motion.Easing.entrance.productive.x1,
						Motion.Easing.entrance.productive.y1,
						Motion.Easing.entrance.productive.x2,
						Motion.Easing.entrance.productive.y2,
					),
				},
				toClose: {
					duration: Motion.Duration.fast_02,
					easing: Easing.bezier(
						Motion.Easing.exit.productive.x1,
						Motion.Easing.exit.productive.y1,
						Motion.Easing.exit.productive.x2,
						Motion.Easing.exit.productive.y2,
					),
				},
			},
			children,
			style,
			contentContainerStyle,
			onToggle,
			onOpened,
			onClosed,
			...props
		},
		forwardedRef,
	) {

		const
			viewRef =
				useRef<Animated.View>(null),

			ref =
				useRef<{
					/**
					 * To compare `positionView` value to avoid unnecessary set state with the same value
					 */
					positionView: 'absolute' | 'relative',
					contentHeight: number,
					openSelf: boolean,
				}>({
					positionView: defaultOpen ?? openProp ? 'relative' : 'absolute',
					contentHeight: 0,
					openSelf: !!defaultOpen,
				}),

			[openSelf, setOpenSelf] =
				useState(ref.current.openSelf),

			/**
			 * Absolute position is required to keep content being rendered as it is when the container is not open (zero height)  
			 *
			 * We need 'relative' position when the collapsible is initially opened due to heightAnimated initial value is zero and only will be calculated after content is rendered  
			 *
			 * This state will be changed once only from 'relative' to 'absolute'  
			 */
			[positionView, setPositionView] =
				useState<'absolute' | 'relative'>(ref.current.positionView),

			heightAnimated =
				useSharedValue(0),

			/**
			 * Initially, just using the current heightAnimated value, and interpolate it.  
			 * But React Native Reanimated doesn't know the max input even we use the ref.current.contentHeight  
			 * If someone have better idea about this without using React State for the max input of interpolate, it might be better
			 * 0 -> Closed
			 * 1 -> Opened
			 */
			contentContainerAnimated =
				useSharedValue(0),

			/**
			 * When i wrote this, i can't find any information about motion specifically for Accordion to animate the content.  
			 * So, i just tried to make it as similar as possible how the React Carbon Design System animation behaviour that using `transition-behaviour: allow-discrete`
			 */
			contentContainerAnimatedStyle =
				useAnimatedStyle(() => {
					return {
						opacity: interpolate(
							contentContainerAnimated.value,
							contentContainerInterpolationRange,
							[0, 1],
						),
						transform: [{
							translateY: interpolate(
								contentContainerAnimated.value,
								contentContainerInterpolationRange,
								[-12, 0],
							),
						}],
					}
				}),

			controlled =
				typeof openProp === 'boolean',

			open =
				controlled ? !!openProp : openSelf,

			setPositionViewToAbsolute =
				useCallback(() => {
					if(ref.current.positionView === 'relative') {
						ref.current.positionView = 'absolute'
						setPositionView('absolute')
					}
				}, []),

			onLayoutContent: NonNullable<AnimatedViewProps['onLayout']> =
				useCallback(({ nativeEvent }) => {
					if(ref.current.contentHeight !== nativeEvent.layout.height) {
						ref.current.contentHeight = nativeEvent.layout.height
						if(open) {
							heightAnimated.value =
								withTiming(
									ref.current.contentHeight,
									undefined,
									() => runOnJS(setPositionViewToAbsolute)(),
								)
						}
					}
				}, [
					heightAnimated,
					open,
					setPositionViewToAbsolute,
				])

		useEffect(() => {
			if(ref.current.contentHeight) {
				if(open) {
					heightAnimated.value =
						withTiming(
							ref.current.contentHeight,
							motion.toOpen,
							onOpened
								? () => runOnJS(onOpened)()
								: undefined,
						)
					contentContainerAnimated.value =
						withTiming(
							1,
							motion.toOpen,
						)
				} else {
					heightAnimated.value =
						withTiming(
							0,
							motion.toClose,
							onClosed
								? () => runOnJS(onClosed)()
								: undefined,
						)
					contentContainerAnimated.value =
						withTiming(
							0,
							motion.toClose,
						)
				}
				onToggle?.(open)
			}
		}, [
			open,
			heightAnimated,
			contentContainerAnimated,
			motion,
			onToggle,
			onOpened,
			onClosed,
		])

		useImperativeHandle(forwardedRef, () => {
			return Object.assign<View, RefBase>(
				viewRef.current as View,
				{
					setOpen(value) {
						if(!controlled) {
							if(typeof value === 'boolean') {
								ref.current.openSelf = value
							} else {
								ref.current.openSelf = value(ref.current.openSelf)
							}
							setOpenSelf(ref.current.openSelf)
						}
					},
				},
			)
		}, [
			controlled,
		])

		return (
			<Animated.View
				{ ...props }
				style={ [
					CommonStyle.overflow_hidden,
					positionView === 'absolute'
						? { height: heightAnimated }
						: null,
					style,
				] }
				ref={ viewRef }
			>
				<View
					style={ [
						CommonStyle.w_full,
						{ position: positionView },
					] }
				>
					<Animated.View
						style={ [
							FlexStyle.flex_initial,
							contentContainerAnimatedStyle,
							contentContainerStyle,
						] }
						onLayout={ onLayoutContent }
					>
						{ children }
					</Animated.View>
				</View>
			</Animated.View>
		)

	},
)

const contentContainerInterpolationRange = [0, 1]
