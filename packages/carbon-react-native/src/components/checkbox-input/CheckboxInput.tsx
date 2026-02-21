import {
	forwardRef,
	useCallback,
	useContext,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react"

import {
	Pressable,
	StyleSheet,
	View,
	type PressableProps,
	type ViewStyle,
} from "react-native"

import {
	Color,
} from "@audira/carbon-react-native-elements"

import IconCheckmark from "@carbon/icons/svg/32/checkmark.svg"
import IconSubtract from "@carbon/icons/svg/32/subtract.svg"

import {
	CarbonStyleSheet,
} from "../../carbon-style-sheet"

import {
	ThemeContext,
} from "../../contexts"

import {
	FlexStyleSheet,
	OverflowStyleSheet,
	PositionStyleSheet,
} from "../../style-sheets"

import type {
	CheckboxInputInteractiveState,
} from "./CheckboxInputInteractiveState"

import type {
	CheckboxInputProps,
} from "./CheckboxInputProps"

import type {
	CheckboxInputRef,
} from "./CheckboxInputRef"

import type {
	CheckboxInputState,
} from "./CheckboxInputState"

import type {
	RefBase,
} from "./_RefBase"

export const CheckboxInput = forwardRef<CheckboxInputRef, CheckboxInputProps>(
	function CheckboxInput(
		{
			defaultChecked,
			checked: checkedProp,
			interactiveState = "normal",
			style,
			role = "checkbox",
			onBlur,
			onChange,
			onFocus,
			onPress,
			...props
		},
		forwardedRef,
	) {

		const
			themeContext =
				useContext(ThemeContext),

			viewRef =
				useRef<View>(null),

			ref =
				useRef({
					onChangeEffect: false,
					value: typeof checkedProp == "boolean" || typeof checkedProp == "object"
						? checkedProp
						: typeof defaultChecked == "boolean" || typeof defaultChecked == "object"
							? defaultChecked
							: false,
				}),

			[isFocused, setIsFocused] =
				useState(false),

			[checkedSelf, setCheckedSelf] =
				useState(() => {
					if(typeof defaultChecked == "boolean" || typeof defaultChecked == "object") {
						return defaultChecked
					}
					return false
				}),

			controlled =
				typeof checkedProp !== "undefined",

			checked =
				controlled ? checkedProp : checkedSelf,

			indeterminate =
				checked === null,

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
					if(interactiveState !== "read_only") {
						if(!controlled) {
							ref.current.onChangeEffect = true
							setCheckedSelf(self => self === null ? true : !self)
						} else {
							onChange?.(ref.current.value === null ? true : !ref.current.value)
						}
					}
				}, [
					controlled,
					interactiveState,
					onPress,
					onChange,
				]),

			iconColor =
				mapIconColor[interactiveState][themeContext.colorScheme]

		useEffect(() => {
			ref.current.value = checked
			if(ref.current.onChangeEffect) {
				ref.current.onChangeEffect = false
				onChange?.(checked)
			}
		}, [
			checked,
			onChange,
		])

		useImperativeHandle(forwardedRef, () => {
			return Object.assign<View, RefBase>(
				viewRef.current as View,
				{
					get checked() {
						return checked
					},
					setChecked(value_) {
						if(!controlled && interactiveState !== "read_only") {
							ref.current.onChangeEffect = true
							setCheckedSelf(self => {
								if(typeof value_ === "function") {
									ref.current.value = value_(self)
								} else {
									ref.current.value = value_
								}
								return ref.current.value
							})
						}
					},
				},
			)
		}, [
			checked,
			controlled,
			interactiveState,
		])

		return (
			<Pressable
				{ ...props }
				disabled={ interactiveState === "disabled" }
				role={ role }
				onBlur={ blurHandler }
				onFocus={ focusHandler }
				onPress={ pressHandler }
				style={ [
					FlexStyleSheet.items_center,
					FlexStyleSheet.justify_center,
					PositionStyleSheet.relative,
					baseStyle.checkbox,
					getInteractiveStateStyle(interactiveState, checked),
					style,
				] }
				ref={ viewRef }
			>
				<View
					style={ [
						PositionStyleSheet.absolute,
						OverflowStyleSheet.overflow_hidden,
						baseStyle.focusBox,
						isFocused
							? carbonStyle.focusBox
							: null,
					] }
				/>

				{ indeterminate ? (
					<IconSubtract
						width={ iconSize }
						height={ iconSize }
						fill={ iconColor }
					/>
				) : (
					<IconCheckmark
						width={ iconSize }
						height={ iconSize }
						fill={ iconColor }
						style={ !checked ? baseStyle.checkmarkHidden : null }
					/>
				) }
			</Pressable>
		)

	},
)

const
	size =
		18,

	iconSize =
		size - 4,

	baseStyle =
		StyleSheet.create({
			checkbox: {
				width: size,
				height: size,
				borderWidth: 1,
			},
			focusBox: {
				width: size + 6,
				height: size + 6,
				borderRadius: 4,
				borderWidth: 2,
				borderColor: "transparent",
			},
			checkmarkHidden: {
				opacity: 0,
			},
		}),

	interactiveStyle =
		CarbonStyleSheet.create<
			Record<`${CheckboxInputInteractiveState}_${"true" | "false"}`, ViewStyle>
		>({
			normal_false: {
				borderColor: CarbonStyleSheet.color.icon_primary,
			},
			normal_true: {
				backgroundColor: CarbonStyleSheet.color.icon_primary,
				borderColor: CarbonStyleSheet.color.icon_primary,
			},
			disabled_false: {
				borderColor: CarbonStyleSheet.color.icon_disabled,
			},
			disabled_true: {
				backgroundColor: CarbonStyleSheet.color.icon_disabled,
				borderColor: CarbonStyleSheet.color.icon_disabled,
			},
			error_false: {
				borderColor: CarbonStyleSheet.color.support_error,
			},
			error_true: {
				backgroundColor: CarbonStyleSheet.color.icon_primary,
				borderColor: CarbonStyleSheet.color.support_error,
			},
			read_only_false: {
				borderColor: CarbonStyleSheet.color.icon_disabled,
			},
			read_only_true: {
				borderColor: CarbonStyleSheet.color.icon_disabled,
			},
			warning_false: {
				borderColor: CarbonStyleSheet.color.icon_primary,
			},
			warning_true: {
				backgroundColor: CarbonStyleSheet.color.icon_primary,
				borderColor: CarbonStyleSheet.color.icon_primary,
			},
		}),

	carbonStyle =
		CarbonStyleSheet.create({
			focusBox: {
				borderColor: CarbonStyleSheet.color.focus,
			},
		}),

	mapIconColor: Record<CheckboxInputInteractiveState, Record<ThemeContext["colorScheme"], string>> =
		{
			normal: {
				gray_10: Color.Token.gray_10.icon_inverse,
				gray_100: Color.Token.gray_100.icon_inverse,
			},
			disabled: {
				gray_10: Color.Token.gray_10.icon_inverse,
				gray_100: Color.Token.gray_100.icon_inverse,
			},
			error: {
				gray_10: Color.Token.gray_10.icon_inverse,
				gray_100: Color.Token.gray_100.icon_inverse,
			},
			read_only: {
				gray_10: Color.Token.gray_10.icon_primary,
				gray_100: Color.Token.gray_100.icon_primary,
			},
			warning: {
				gray_10: Color.Token.gray_10.icon_inverse,
				gray_100: Color.Token.gray_100.icon_inverse,
			},
		}

function getInteractiveStateStyle(
	interactiveState: CheckboxInputInteractiveState,
	value: CheckboxInputState,
) {
	return interactiveStyle[`${interactiveState}_${typeof value == "object" ? true : value}`]
}
