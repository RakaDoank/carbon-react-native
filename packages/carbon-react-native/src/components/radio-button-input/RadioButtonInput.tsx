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
	CommonStyleSheet,
	FlexStyleSheet,
} from "../../_internal/style-sheets"

import {
	CarbonStyleSheet,
} from "../../carbon-style-sheet"

import {
	ThemeContext,
} from "../../contexts"

import type {
	RadioButtonInputInteractiveState,
} from "./RadioButtonInputInteractiveState"

import type {
	RadioButtonInputProps,
} from "./RadioButtonInputProps"

import type {
	RadioButtonInputRef,
} from "./RadioButtonInputRef"

import type {
	RefBase,
} from "./_RefBase"

export const RadioButtonInput = forwardRef<RadioButtonInputRef, RadioButtonInputProps>(
	function RadioButtonInput(
		{
			defaultChecked,
			checked: checkedProp,
			value,
			interactiveState = "normal",
			role = "radio",
			onChange,
			onBlur,
			onFocus,
			onPress,
			style,
			...props
		},
		forwardedRef,
	) {

		useContext(ThemeContext)

		const
			viewRef =
				useRef<View>(null),

			ref =
				useRef({
					onChangeEffect: false,
					checked: defaultChecked ?? false,
				}),

			[isFocused, setIsFocused] =
				useState(false),

			[checkedSelf, setCheckedSelf] =
				useState(ref.current.checked),

			controlled =
				typeof checkedProp === "boolean",

			checked =
				controlled ? !!checkedProp : checkedSelf,

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
						setCheckedSelf(true)
					} else {
						onChange?.(!ref.current.checked, value)
					}
				}, [
					controlled,
					onPress,
					onChange,
					value,
				])

		useEffect(() => {
			if(ref.current.onChangeEffect) {
				ref.current.onChangeEffect = false
				ref.current.checked = checked
				onChange?.(ref.current.checked, value)
			}
		}, [
			checked,
			value,
			onChange,
		])

		useImperativeHandle(forwardedRef, () => {
			return Object.assign<View, RefBase>(
				(viewRef.current ?? {
				}) as View,
				{
					get checked() {
						return checked
					},
					setChecked(checked_) {
						if(!controlled) {
							ref.current.onChangeEffect = true
							if(typeof checked_ === "boolean") {
								ref.current.checked = checked_
							} else {
								ref.current.checked = checked_(ref.current.checked)
							}
							setCheckedSelf(ref.current.checked)
						}
					},
				},
			)
		}, [
			controlled,
			checked,
		])

		return (
			<Pressable
				{ ...props }
				role={ role }
				disabled={ interactiveState === "disabled" }
				onBlur={ blurHandler }
				onFocus={ focusHandler }
				onPress={ pressHandler }
				style={ [
					FlexStyleSheet.items_center,
					FlexStyleSheet.justify_center,
					CommonStyleSheet.relative,
					baseStyle.radioButton,
					mapInteractiveStateStyle_[`${interactiveState}_${checked}_container`],
					style,
				] }
				ref={ viewRef }
			>
				<View
					style={ [
						CommonStyleSheet.absolute,
						CommonStyleSheet.overflow_hidden,
						baseStyle.focusBox,
						isFocused
							? carbonStyle.focusBox
							: null,
					] }
				/>

				<View
					style={ [
						FlexStyleSheet.flex_initial,
						baseStyle.marker,
						checked
							? mapInteractiveStateStyle_[`${interactiveState}_true_marker`]
							: null,
					] }
				/>
			</Pressable>
		)

	},
)

const
	size =
		18,

	baseStyle =
		StyleSheet.create({
			radioButton: {
				width: size,
				height: size,
				borderRadius: size,
				borderWidth: 1,
			},
			focusBox: {
				width: size + 6,
				height: size + 6,
				borderRadius: size + 3,
				borderWidth: 2,
				borderColor: "transparent",
			},
			marker: {
				width: size / 2,
				height: size / 2,
				borderRadius: size,
				overflow: "hidden",
			},
		}),

	carbonStyle =
		CarbonStyleSheet.create({
			focusBox: {
				borderColor: CarbonStyleSheet.color.focus,
			},
		}),

	mapInteractiveStateStyle_ =
		CarbonStyleSheet.create<
			Record<
				| `${RadioButtonInputInteractiveState}_true_${"container" | "marker"}`
				| `${RadioButtonInputInteractiveState}_false_container`,
				ViewStyle
			>
		>({
			normal_true_container: {
				borderColor: CarbonStyleSheet.color.icon_primary,
			},
			normal_true_marker: {
				backgroundColor: CarbonStyleSheet.color.icon_primary,
			},
			normal_false_container: {
				borderColor: CarbonStyleSheet.color.icon_primary,
			},

			disabled_true_container: {
				borderColor: CarbonStyleSheet.color.icon_disabled,
			},
			disabled_true_marker: {
				backgroundColor: CarbonStyleSheet.color.icon_disabled,
			},
			disabled_false_container: {
				borderColor: CarbonStyleSheet.color.icon_disabled,
			},

			error_true_container: {
				borderColor: CarbonStyleSheet.color.support_error,
			},
			error_true_marker: {
				backgroundColor: CarbonStyleSheet.color.icon_primary,
			},
			error_false_container: {
				borderColor: CarbonStyleSheet.color.support_error,
			},

			read_only_true_container: {
				borderColor: CarbonStyleSheet.color.icon_disabled,
			},
			read_only_true_marker: {
				backgroundColor: CarbonStyleSheet.color.icon_primary,
			},
			read_only_false_container: {
				borderColor: CarbonStyleSheet.color.icon_disabled,
			},

			warning_true_container: {
				borderColor: CarbonStyleSheet.color.icon_primary,
			},
			warning_true_marker: {
				backgroundColor: CarbonStyleSheet.color.icon_primary,
			},
			warning_false_container: {
				backgroundColor: CarbonStyleSheet.color.icon_primary,
			},
		})
