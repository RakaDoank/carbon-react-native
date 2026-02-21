import {
	forwardRef,
	useCallback,
	useContext,
	useImperativeHandle,
	useRef,
} from "react"

import {
	Pressable,
	StyleSheet,
	View,
	type PressableProps,
	type TextStyle,
} from "react-native"

import {
	Spacing,
} from "@audira/carbon-react-native-elements"

import {
	CarbonStyleSheet,
} from "../../carbon-style-sheet"

import {
	ThemeContext,
} from "../../contexts"

import {
	FlexStyleSheet,
	HeightStyleSheet,
	PositionStyleSheet,
	WidthStyleSheet,
} from "../../style-sheets"

import {
	Box,
} from "../box"

import {
	CheckboxInput,
	type CheckboxInputInteractiveState,
	type CheckboxInputRef,
} from "../checkbox-input"

import {
	FormLabel,
} from "../form-label"

import type {
	CheckboxProps,
} from "./CheckboxProps"

import type {
	CheckboxRef,
} from "./CheckboxRef"

import type {
	RefBase,
} from "./_RefBase"


export const Checkbox = forwardRef<CheckboxRef, CheckboxProps>(
	function Checkbox(
		{
			defaultChecked,
			checked,
			interactiveState = "normal",
			label,
			role = "checkbox",
			"aria-label": ariaLabel,
			onChange,
			onPress,
			checkboxInputProps,
			formLabelProps,
			pressableProps,
			style,
			...props
		},
		forwardedRef,
	) {

		useContext(ThemeContext)

		const
			checkboxInputRef =
				useRef<CheckboxInputRef>(null),

			viewRef =
				useRef<View>(null),

			pressHandler: NonNullable<PressableProps["onPress"]> =
				useCallback(event => {
					onPress?.(event)
					if(checkboxInputRef.current) {
						checkboxInputRef.current.setChecked(
							checkboxInputRef.current.checked === null
								? true
								: !checkboxInputRef.current.checked,
						)
					}
				}, [
					onPress,
				])

		useImperativeHandle(forwardedRef, () => {
			return Object.assign<View, RefBase>(
				(viewRef.current ?? {
				}) as View,
				{
					get checked() {
						return checkboxInputRef.current!.checked
					},
					setChecked(value_) {
						checkboxInputRef.current?.setChecked(value_)
					},
				},
			)
		}, [])

		return (
			<Box
				{ ...props }
				aria-label={ ariaLabel || label }
				style={ [
					FlexStyleSheet.flex_row,
					style,
				] }
				ref={ viewRef }
			>
				<Pressable
					{ ...pressableProps }
					role={ role }
					disabled={ interactiveState === "disabled" }
					aria-label={ pressableProps?.["aria-label"] ?? label }
					onPress={ pressHandler }
					style={ [
						PositionStyleSheet.absolute,
						WidthStyleSheet.w_full,
						HeightStyleSheet.h_full,
						baseStyle.pressable,
						pressableProps?.style,
					] }
				/>

				<CheckboxInput
					{ ...checkboxInputProps }
					role="none"
					defaultChecked={ defaultChecked }
					checked={ checked }
					interactiveState={ interactiveState }
					onChange={ onChange }
					onPress={ onPress }
					style={ [
						baseStyle.checkboxInput,
						checkboxInputProps?.style,
					] }
					ref={ checkboxInputRef }
				/>

				<FormLabel
					{ ...formLabelProps }
					label={ label }
					textProps={{
						...formLabelProps?.textProps,
						type: formLabelProps?.textProps?.type || "body_compact_01",
						style: [
							textColorStyle[interactiveState],
							formLabelProps?.textProps?.style,
						],
					}}
					style={ [
						FlexStyleSheet.flex_1,
						baseStyle.label,
						formLabelProps?.style,
					] }
				/>
			</Box>
		)

	},
)

const
	baseStyle =
		StyleSheet.create({
			pressable: {
				zIndex: 1,
			},
			checkboxInput: {
				zIndex: 2,
			},
			label: {
				marginStart: Spacing.spacing_03,
			},
		}),

	textColorStyle =
		CarbonStyleSheet.create<
			Record<CheckboxInputInteractiveState, TextStyle>
		>({
			normal: {
				color: CarbonStyleSheet.color.text_primary,
			},
			disabled: {
				color: CarbonStyleSheet.color.text_disabled,
			},
			error: {
				color: CarbonStyleSheet.color.text_primary,
			},
			read_only: {
				color: CarbonStyleSheet.color.text_primary,
			},
			warning: {
				color: CarbonStyleSheet.color.text_primary,
			},
		})
