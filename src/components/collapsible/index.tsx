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
	type ViewProps,
} from 'react-native'

import Animated, {
	Easing,
	interpolate,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
	type WithTimingConfig,
} from 'react-native-reanimated'

import {
	MotionConstant,
} from '../../constants'

import {
	CommonStyle,
	FlexStyle,
} from '../../styles'

export interface CollapsibleProps extends ViewProps {
	controlled?: boolean,
	open?: boolean,
	motion?: Record<'toOpen' | 'toClose', {
		/**
		 * In milliseconds
		 */
		duration?: number,
		easing?: WithTimingConfig['easing'],
	}>,
	contentContainerStyle?: ViewProps['style'],
	onToggle?: (value: boolean) => void,
	onOpened?: () => void,
	onClosed?: () => void,
}

export interface CollapsibleRef {
	/**
	 * This method does nothing when `controlled` prop is true
	 */
	setOpen: (value: boolean) => void,
}

export const Collapsible = forwardRef<CollapsibleRef, CollapsibleProps>(
	function Collapsible(
		{
			controlled,
			open,
			motion = {
				toOpen: {
					duration: MotionConstant.Durations.fast_02,
					easing: Easing.bezier(
						MotionConstant.Easings.entrance.productive.x1,
						MotionConstant.Easings.entrance.productive.y1,
						MotionConstant.Easings.entrance.productive.x2,
						MotionConstant.Easings.entrance.productive.y2,
					),
				},
				toClose: {
					duration: MotionConstant.Durations.fast_02,
					easing: Easing.bezier(
						MotionConstant.Easings.exit.productive.x1,
						MotionConstant.Easings.exit.productive.y1,
						MotionConstant.Easings.exit.productive.x2,
						MotionConstant.Easings.exit.productive.y2,
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
			ref =
				useRef<{
					/**
					 * To compare `positionView` value to avoid unnecessary set state with the same value
					 */
					positionView: 'absolute' | 'relative',
					contentHeight: number,
				}>({
					positionView: open ? 'relative' : 'absolute',
					contentHeight: 0,
				}),

			[openSelf, setOpenSelf] =
				useState(!!open),

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
			 * When i wrote this, i can't find any information about motion specifally for Accordion to animate the content.  
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

			isOpen =
				controlled ? !!open : openSelf,

			setPositionViewToAbsolute =
				useCallback(() => {
					if(ref.current.positionView === 'relative') {
						ref.current.positionView = 'absolute'
						setPositionView('absolute')
					}
				}, []),

			onLayoutContent: NonNullable<ViewProps['onLayout']> =
				useCallback(({ nativeEvent }) => {
					if(ref.current.contentHeight !== nativeEvent.layout.height) {
						ref.current.contentHeight = nativeEvent.layout.height
						if(isOpen) {
							heightAnimated.value =
								withTiming(
									ref.current.contentHeight,
									undefined,
									() => runOnJS(setPositionViewToAbsolute)()
								)
						}
					}
				}, [
					heightAnimated,
					isOpen,
					setPositionViewToAbsolute,
				])

		useEffect(() => {
			if(ref.current.contentHeight) {
				if(isOpen) {
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
					onToggle?.(true)
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
					onToggle?.(false)
				}
			}
		}, [
			isOpen,
			heightAnimated,
			contentContainerAnimated,
			motion,
			onToggle,
			onOpened,
			onClosed,
		])

		useImperativeHandle(forwardedRef, () => {
			return {
				setOpen(value) {
					if(!controlled) {
						setOpenSelf(value)
					}
				},
			}
		}, [
			controlled,
		])

		return (
			<Animated.View
				{ ...props }
				style={ [
					FlexStyle.flex_initial,
					CommonStyle.overflow_hidden,
					positionView === 'absolute'
						? { height: heightAnimated }
						: null,
					style,
				] }
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

	}
)

const contentContainerInterpolationRange = [0, 1]
