import {
	forwardRef,
	useCallback,
	useContext,
	useEffect,
	useImperativeHandle,
	useMemo,
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

export type SwitchState =
	| 'normal'
	| 'disabled'
	| 'read_only'

export interface SwitchProps extends Omit<PressableProps, 'children'> {
	size?: SwitchSize,
	state?: SwitchState,
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

interface SwitchRefBase {
	readonly value: boolean,
	/**
	 * This method does nothing if `controlled` prop is true
	 */
	setValue: (value: boolean | ((currentValue: boolean) => boolean)) => void,
}

export interface SwitchRef extends View, SwitchRefBase {
}

export const Switch = forwardRef<SwitchRef, SwitchProps>(
	function Switch(
		{

			size = 'default',
			state = 'normal',
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
					value: !!valueProp,
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

			{ trackColor, thumbColor } =
				useMemo<{
					trackColor: NonNullable<SwitchProps['trackColor']>,
					thumbColor: NonNullable<SwitchProps['thumbColor']>,
				}>(() => {
					const
						trackColor_ =
							mapSwitchTrackColorToken[state],

						thumbColor_ =
							themeContext.color[mapSwitchThumbColorToken[state]]

					return {
						trackColor: trackColorProp ?? {
							false: trackColor_.false ? themeContext.color[trackColor_.false] : 'transparent',
							true: trackColor_.true ? themeContext.color[trackColor_.true] : 'transparent',
						},
						thumbColor: thumbColorProp ?? {
							false: thumbColor_,
							true: thumbColor_,
						},
					}
				// eslint-disable-next-line react-hooks/exhaustive-deps
				}, [
					state,
					trackColorProp,
					thumbColorProp,
				]),

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
						ref.current.value = !ref.current.value
						setValueSelf(ref.current.value)
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
				ref.current.value = value
				onChange?.(value)
			}
		}, [
			value,
			onChange,
		])

		useImperativeHandle(forwardedRef, () => {
			return Object.assign<View, SwitchRefBase>(
				(viewRef.current ?? {}) as View,
				{
					get value() {
						return ref.current.value
					},
					setValue(val) {
						if(!controlled) {
							if(typeof val === 'boolean') {
								ref.current.value = val
							} else {
								ref.current.value = val(ref.current.value)
							}
							setValueSelf(ref.current.value)
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
				aria-checked={ ariaChecked ?? value }
				style={ [
					FlexStyle.justify_center,
					baseStyle.container,
					sizeStyle[size],
					trackAnimatedStyle,
					state === 'read_only' ? [
						baseStyle.containerReadonly,
						{ borderColor: themeContext.color.border_subtle_00 },
					] : null,
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
			containerReadonly: {
				borderWidth: 1,
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

	mapSwitchTrackColorToken: Record<SwitchState | 'focused', Partial<Record<'false' | 'true', keyof ThemeContext['color']>>> =
		{
			normal: {
				false: 'toggle_off',
				true: 'support_success',
			},
			disabled: {
				false: 'button_disabled',
				true: 'button_disabled',
			},
			read_only: {},
			focused: {
				false: 'toggle_off',
				true: 'support_success',
			},
		},

	mapSwitchThumbColorToken: Record<SwitchState | 'focused', keyof ThemeContext['color']> =
		{
			normal: 'icon_on_color',
			disabled: 'icon_on_color_disabled',
			read_only: 'icon_primary',
			focused: 'icon_on_color',
		},

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
