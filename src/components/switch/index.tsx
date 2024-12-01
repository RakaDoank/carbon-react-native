import {
	forwardRef,
	useCallback,
	useContext,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from 'react'

import {
	Pressable,
	StyleSheet,
	View,
	type PressableProps,
} from 'react-native'

import Checkmark from '@carbon/icons/es/checkmark/20'

import Animated, {
	Easing,
	interpolate,
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
	type WithTimingConfig,
} from 'react-native-reanimated'

import {
	MotionConstant,
} from '../../constants'

import {
	ThemeContext,
} from '../../contexts'

import {
	CommonStyle,
	FlexStyle,
} from '../../styles'

import {
	Icon,
} from '../icon'

export interface SwitchProps extends Omit<PressableProps, 'children'> {
	size?: SwitchSize,
	controlled?: boolean,
	value?: boolean,
	trackColor?: Record<'false' | 'true', string>,
	thumbColor?: Record<'false' | 'true', string>,
	motion?: Record<'false' | 'true', WithTimingConfig>,
	onChange?: (value: boolean) => void,
	style?: Exclude<PressableProps['style'], Function>,
}

/**
 * https://carbondesignsystem.com/components/toggle/style/#size
 */
export type SwitchSize = 'default' | 'small'

export interface SwitchRef extends View {
	/**
	 * This method does nothing if `controlled` prop is true
	 */
	setValue: (value: boolean | ((currentValue: boolean) => boolean)) => void,
}

export const Switch = forwardRef<SwitchRef, SwitchProps>(
	function Switch(
		{
			size = 'default',
			controlled,
			value: valueProp,
			trackColor: trackColorProp,
			thumbColor: thumbColorProp,
			motion = {
				false: motionDefault,
				true: motionDefault,
			},
			style,
			role = 'switch',
			'aria-checked': ariaChecked,
			onChange,
			onBlur,
			onFocus,
			onPress,
			...props
		},
		forwardedRef,
	) {

		const
			isMounted =
				useRef(false),

			viewRef =
				useRef<View>(null),

			ref =
				useRef({
					valueSelf: !!valueProp,
				}),

			themeContext =
				useContext(ThemeContext),

			[isFocused, setIsFocused] =
				useState(false),

			[valueSelf, setValueSelf] =
				useState(!!valueProp),

			value =
				controlled ? !!valueProp : valueSelf,

			/**
			 * 0 -> false/inactive
			 * 1 -> true/active
			 */
			sharedValue =
				useSharedValue(value ? 1 : 0),

			trackColor =
				trackColorProp ?? {
					false: themeContext.color.toggle_off,
					true: themeContext.color.support_success,
				},

			thumbColor =
				thumbColorProp ?? {
					false: themeContext.color.icon_on_color,
					true: themeContext.color.icon_on_color,
				},

			trackAnimatedStyle =
				useAnimatedStyle(() => {
					return {
						backgroundColor: interpolateColor(
							sharedValue.value,
							interpolationRange,
							[trackColor.false, trackColor.true],
						),
					}
				}),

			thumbAnimatedStyle =
				useAnimatedStyle(() => {
					return {
						transform: [{
							translateX: interpolate(
								sharedValue.value,
								interpolationRange,
								[
									/**
									 * looks like IBM didn't explicitly tell this gap between the container and the thumb/handle
									 * i have to look at the Carbon React just to find this padding (they are using inset-inline-start there)
									 */
									3,
									sizeStyle[size].width - thumbSizeStyle[size].width - 3,
								],
							),
						}],
						backgroundColor: interpolateColor(
							sharedValue.value,
							interpolationRange,
							[thumbColor.false, thumbColor.true],
						),
					}
				}),

			iconAnimatedStyle =
				useAnimatedStyle(() => {
					return {
						opacity: interpolate(
							sharedValue.value,
							interpolationRange,
							interpolationRange,
						),
					}
				}),

			blurHandler: NonNullable<PressableProps['onBlur']> =
				useCallback(event => {
					onBlur?.(event)
					setIsFocused(false)
				}, [
					onBlur,
				]),

			focusHandler: NonNullable<PressableProps['onFocus']> =
				useCallback(event => {
					onFocus?.(event)
					setIsFocused(true)
				}, [
					onFocus,
				]),

			pressHandler: NonNullable<PressableProps['onPress']> =
				useCallback(event => {
					onPress?.(event)
					if(!controlled) {
						ref.current.valueSelf = !ref.current.valueSelf
						setValueSelf(ref.current.valueSelf)
					}
				}, [
					controlled,
					onPress,
				])

		useEffect(() => {
			if(value) {
				sharedValue.value = withTiming(1, motion.true)
			} else {
				sharedValue.value = withTiming(0, motion.false)
			}
		}, [
			motion,
			sharedValue,
			value,
		])

		useEffect(() => {
			if(!isMounted.current) {
				isMounted.current = true
			} else {
				onChange?.(value)
			}
		}, [
			value,
			onChange,
		])

		useImperativeHandle(forwardedRef, () => {
			return Object.assign<View, { setValue: SwitchRef['setValue'] }>(
				viewRef.current as View,
				{
					setValue(val) {
						if(!controlled) {
							if(typeof val === 'boolean') {
								ref.current.valueSelf = val
							} else {
								ref.current.valueSelf = val(ref.current.valueSelf)
							}
							setValueSelf(ref.current.valueSelf)
						}
					},
				},
			)
		}, [
			controlled,
		])

		return (
			<PressableAnimated
				{ ...props }
				role={ role }
				aria-checked={ ariaChecked || value }
				style={ [
					FlexStyle.justify_center,
					baseStyle.container,
					sizeStyle[size],
					trackAnimatedStyle,
					style,
				] }
				onBlur={ blurHandler }
				onFocus={ focusHandler }
				onPress={ pressHandler }
				ref={ viewRef }
			>
				<Animated.View
					style={ [
						FlexStyle.items_center,
						FlexStyle.justify_center,
						baseStyle.thumb,
						thumbSizeStyle[size],
						thumbAnimatedStyle,
					] }
				>
					{ size === 'small' && (
						<IconAnimated
							src={ Checkmark }
							fill={ themeContext.color.support_success }
							style={ iconAnimatedStyle }
						/>
					) }
				</Animated.View>

				{ isFocused && (
					<View
						style={ [
							CommonStyle.absolute,
							focusBoxSizeStyle[size],
							baseStyle.focusBox,
							{ borderColor: themeContext.color.focus },
						] }
					/>
				) }
			</PressableAnimated>
		)

	}
)

const
	baseStyle =
		StyleSheet.create({
			container: {
				borderRadius: 24,
			},
			thumb: {
				borderRadius: 18,
			},
			focusBox: {
				borderWidth: 2,
				borderRadius: 24,
				transform: [{
					translateX: -3,
				}],
			},
		}),

	sizeStyle =
		StyleSheet.create<Record<SwitchSize, Record<'width' | 'height', number>>>({
			default: {
				width: 48,
				height: 24,
			},
			small: {
				width: 32,
				height: 16,
			},
		}),

	thumbSizeStyle =
		StyleSheet.create<typeof sizeStyle>({
			default: {
				width: 18,
				height: 18,
			},
			small: {
				width: 10,
				height: 10,
			},
		}),

	focusBoxSizeStyle =
		StyleSheet.create<typeof sizeStyle>({
			default: {
				width: sizeStyle.default.width + 6,
				height: sizeStyle.default.height + 6,
			},
			small: {
				width: sizeStyle.small.width + 6,
				height: sizeStyle.small.height + 6,
			},
		}),

	interpolationRange =
		[0, 1],

	motionDefault: NonNullable<SwitchProps['motion']>['false'] =
		{
			duration: MotionConstant.Durations.fast_01,
			easing: Easing.bezier(
				MotionConstant.Easings.exit.productive.x1,
				MotionConstant.Easings.exit.productive.y1,
				MotionConstant.Easings.exit.productive.x2,
				MotionConstant.Easings.exit.productive.y2,
			),
		},

	PressableAnimated =
		Animated.createAnimatedComponent(Pressable),

	IconAnimated =
		Animated.createAnimatedComponent(Icon)
