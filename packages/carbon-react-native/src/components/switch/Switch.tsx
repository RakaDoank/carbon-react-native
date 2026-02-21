import {
	forwardRef,
	useCallback,
	useContext,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from "react"

import {
	Animated,
	Easing,
	Pressable,
	StyleSheet,
	View,
	type EasingFunction,
	type PressableProps,
} from "react-native"

import {
	Color,
	Motion,
} from "@audira/carbon-react-native-elements"

import IconCheckmark from "@carbon/icons/svg/32/checkmark.svg"

import {
	GlobalConfigContext,
} from "../../_internal/contexts"

import {
	CarbonStyleSheet,
} from "../../carbon-style-sheet"

import {
	ThemeContext,
} from "../../contexts"

import {
	FlexStyleSheet,
	PositionStyleSheet,
} from "../../style-sheets"

import type {
	SwitchProps,
} from "./SwitchProps"

import type {
	SwitchRef,
} from "./SwitchRef"

import type {
	SwitchSize,
} from "./SwitchSize"

import type {
	SwitchState,
} from "./SwitchState"

import type {
	RefBase,
} from "./_RefBase"

export const Switch = forwardRef<SwitchRef, SwitchProps>(
	function(
		{

			size = "default",
			state = "normal",
			defaultValue,
			value: valueProp,
			trackColor: trackColorProp,
			thumbColor: thumbColorProp,
			motion = {
				false: motionDefault,
				true: motionDefault,
			},
			style,
			role = "switch",
			"aria-checked": ariaChecked,
			onChange,
			onBlur,
			onFocus,
			onPress,
			...props
		},
		forwardedRef,
	) {

		const
			viewRef =
				useRef<View>(null),

			ref =
				useRef({
					onChangeEffect: false,
					value: defaultValue ?? false,
				}),

			globalConfigContext =
				useContext(GlobalConfigContext),

			themeContext =
				useContext(ThemeContext),

			[isFocused, setIsFocused] =
				useState(false),

			[valueSelf, setValueSelf] =
				useState(ref.current.value),

			controlled =
				typeof valueProp === "boolean",

			value =
				controlled ? !!valueProp : valueSelf,

			/**
			 * 0 -> false/inactive
			 * 1 -> true/active
			 */
			sharedValue =
				useRef(new Animated.Value(value ? 1 : 0)),

			{ trackColor, thumbColor } =
				useMemo<{
					trackColor: NonNullable<SwitchProps["trackColor"]>,
					thumbColor: NonNullable<SwitchProps["thumbColor"]>,
				}>(() => {
					const
						trackColor_ =
							mapSwitchTrackColorToken[state],

						thumbColor_ =
							mapSwitchThumbColorToken[state]

					return {
						trackColor: trackColorProp ?? {
							false: trackColor_.false?.[themeContext.colorScheme] ?? "transparent",
							true: trackColor_.true?.[themeContext.colorScheme] ?? "transparent",
						},
						thumbColor: thumbColorProp ?? {
							false: thumbColor_[themeContext.colorScheme],
							true: thumbColor_[themeContext.colorScheme],
						},
					}
				}, [
					state,
					trackColorProp,
					thumbColorProp,
					themeContext.colorScheme,
				]),

			blurHandler: NonNullable<PressableProps["onBlur"]> =
				useCallback(event => {
					onBlur?.(event)
					setIsFocused(false)
				}, [
					onBlur,
				]),

			focusHandler: NonNullable<PressableProps["onFocus"]> =
				useCallback(event => {
					onFocus?.(event)
					setIsFocused(true)
				}, [
					onFocus,
				]),

			pressHandler: NonNullable<PressableProps["onPress"]> =
				useCallback(event => {
					onPress?.(event)
					if(!controlled) {
						ref.current.onChangeEffect = true
						setValueSelf(self => !self)
					} else {
						onChange?.(!ref.current.value)
					}
				}, [
					controlled,
					onPress,
					onChange,
				]),

			transformInterpolationOutputRange =
				useMemo(() => {
					const ltr = [
						/**
						 * i can't find how IBM tell this gap between the container and the thumb/handle
						 * i have to look at the Carbon React just to find this padding (they are using inset-inline-start there)
						 */
						3,
						sizeStyle[size].width - thumbSizeStyle[size].width - 3,
					]

					if(globalConfigContext.rtl) {
						return ltr.reverse()
					}

					return ltr
				}, [
					size,
					globalConfigContext.rtl,
				])

		useEffect(() => {
			if(value) {
				Animated.timing(
					sharedValue.current,
					{
						toValue: 1,
						duration: motion.true.duration,
						easing: motion.true.easing as EasingFunction,
						useNativeDriver: true,
					},
				).start()
			} else {
				Animated.timing(
					sharedValue.current,
					{
						toValue: 0,
						duration: motion.false.duration,
						easing: motion.false.easing as EasingFunction,
						useNativeDriver: true,
					},
				).start()
			}
		}, [
			motion,
			sharedValue,
			value,
		])

		useEffect(() => {
			ref.current.value = value
			if(ref.current.onChangeEffect) {
				ref.current.onChangeEffect = false
				onChange?.(value)
			}
		}, [
			value,
			onChange,
		])

		useImperativeHandle(forwardedRef, () => {
			return Object.assign<View, RefBase>(
				(viewRef.current ?? {
				}) as View,
				{
					get value() {
						return value
					},
					setValue(valueParam) {
						if(!controlled) {
							ref.current.onChangeEffect = true
							if(typeof valueParam === "boolean") {
								setValueSelf(valueParam)
							} else {
								setValueSelf(valueParam(ref.current.value))
							}
						}
					},
				},
			)
		}, [
			controlled,
			value,
		])

		return (
			<PressableAnimated
				{ ...props }
				role={ role }
				aria-checked={ ariaChecked ?? value }
				style={ [
					FlexStyleSheet.justify_center,
					baseStyle.container,
					sizeStyle[size],
					{
						backgroundColor: sharedValue.current.interpolate({
							inputRange: interpolationRange,
							outputRange: [trackColor.false, trackColor.true],
						}),
					},
					state === "read_only" ? baseStyleCarbon.containerReadonly : null,
					style,
				] }
				onBlur={ blurHandler }
				onFocus={ focusHandler }
				onPress={ pressHandler }
				ref={ viewRef }
			>
				<Animated.View
					style={ [
						FlexStyleSheet.items_center,
						FlexStyleSheet.justify_center,
						baseStyle.thumb,
						thumbSizeStyle[size],
						// thumbAnimatedStyle,
						{
							transform: [{
								translateX: sharedValue.current.interpolate({
									inputRange: interpolationRange,
									outputRange: transformInterpolationOutputRange,
								}),
							}],
							backgroundColor: sharedValue.current.interpolate({
								inputRange: interpolationRange,
								outputRange: [thumbColor.false, thumbColor.true],
							}),
						},
					] }
				>
					{ size === "small" && (
						<IconCheckmarkAnimated
							fill={ mapIconAnimatedFillColor[themeContext.colorScheme] }
							style={{
								opacity: sharedValue.current,
							}}
						/>
					) }
				</Animated.View>

				{ isFocused && (
					<View
						style={ [
							PositionStyleSheet.absolute,
							focusBoxSizeStyle[size],
							baseStyle.focusBox,
							baseStyleCarbon.focusBoxBorderColor,
						] }
					/>
				) }
			</PressableAnimated>
		)

	},
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

	baseStyleCarbon =
		CarbonStyleSheet.create({
			containerReadonly: {
				borderWidth: 1,
				borderColor: CarbonStyleSheet.color.border_subtle_00,
			},
			focusBoxBorderColor: {
				borderColor: CarbonStyleSheet.color.focus,
			},
		}),

	sizeStyle =
		StyleSheet.create<Record<SwitchSize, Record<"width" | "height", number>>>({
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

	mapSwitchTrackColorToken: Record<SwitchState | "focused", Partial<Record<"false" | "true", Record<ThemeContext["colorScheme"], string>>>> =
		{
			normal: {
				false: {
					gray_10: Color.Token.gray_10.toggle_off,
					gray_100: Color.Token.gray_100.toggle_off,
				},
				true: {
					gray_10: Color.Token.gray_10.support_success,
					gray_100: Color.Token.gray_100.support_success,
				},
			},
			disabled: {
				false: {
					gray_10: Color.Token.gray_10.button_disabled,
					gray_100: Color.Token.gray_100.button_disabled,
				},
				true: {
					gray_10: Color.Token.gray_10.button_disabled,
					gray_100: Color.Token.gray_100.button_disabled,
				},
			},
			read_only: {
			},
			focused: {
				false: {
					gray_10: Color.Token.gray_10.toggle_off,
					gray_100: Color.Token.gray_100.toggle_off,
				},
				true: {
					gray_10: Color.Token.gray_10.support_success,
					gray_100: Color.Token.gray_100.support_success,
				},
			},
		},

	mapSwitchThumbColorToken: Record<SwitchState | "focused", Record<ThemeContext["colorScheme"], string>> =
		{
			normal: {
				gray_10: Color.Token.gray_10.icon_on_color,
				gray_100: Color.Token.gray_100.icon_on_color,
			},
			disabled: {
				gray_10: Color.Token.gray_10.icon_on_color_disabled,
				gray_100: Color.Token.gray_100.icon_on_color_disabled,
			},
			read_only: {
				gray_10: Color.Token.gray_10.icon_primary,
				gray_100: Color.Token.gray_100.icon_primary,
			},
			focused: {
				gray_10: Color.Token.gray_10.icon_on_color,
				gray_100: Color.Token.gray_100.icon_on_color,
			},
		},

	interpolationRange =
		[0, 1],

	motionDefault =
		{
			duration: Motion.Duration.fast_01,
			easing: Easing.bezier(
				Motion.Easing.exit.productive.x1,
				Motion.Easing.exit.productive.y1,
				Motion.Easing.exit.productive.x2,
				Motion.Easing.exit.productive.y2,
			),
		} as const satisfies NonNullable<SwitchProps["motion"]>["false"],

	PressableAnimated =
		Animated.createAnimatedComponent(Pressable),

	IconCheckmarkAnimated =
		Animated.createAnimatedComponent(IconCheckmark),

	mapIconAnimatedFillColor: Record<ThemeContext["colorScheme"], string> =
		{
			gray_10: Color.Token.gray_10.support_success,
			gray_100: Color.Token.gray_100.support_success,
		}
