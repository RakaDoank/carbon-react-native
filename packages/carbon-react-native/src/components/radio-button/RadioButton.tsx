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
	HeightStyleSheet,
	PositionStyleSheet,
	WidthStyleSheet,
} from "../../style-sheets"

import {
	Box,
} from "../box"

import {
	FormLabel,
} from "../form-label"

import {
	RadioButtonInput,
	type RadioButtonInputInteractiveState,
	type RadioButtonInputRef,
} from "../radio-button-input"

import type {
	RadioButtonProps,
} from "./RadioButtonProps"

import type {
	RadioButtonRef,
} from "./RadioButtonRef"

import type {
	RefBase,
} from "./_RefBase"

export const RadioButton = forwardRef<RadioButtonRef, RadioButtonProps>(
	function RadioButton(
		{
			defaultChecked,
			checked,
			value,
			interactiveState = "normal",
			label,
			role = "radio",
			"aria-label": ariaLabel,
			onChange,
			onPress,
			radioButtonInputProps,
			formLabelProps,
			pressableProps,
			style,
			dir,
			...props
		},
		forwardedRef,
	) {

		useContext(ThemeContext)

		const
			radioButtonInputRef =
				useRef<RadioButtonInputRef>(null),

			globalConfigContext =
				useContext(GlobalConfigContext),

			viewRef =
				useRef<View>(null),

			pressHandler: NonNullable<PressableProps["onPress"]> =
				useCallback(event => {
					onPress?.(event)
					radioButtonInputRef.current?.setChecked(true)
				}, [
					onPress,
				])

		useImperativeHandle(forwardedRef, () => {
			return Object.assign<View, RefBase>(
				(viewRef.current ?? {
				}) as View,
				{
					get checked() {
						return radioButtonInputRef.current!.checked
					},
					setChecked(checked_) {
						radioButtonInputRef.current?.setChecked(checked_)
					},
				},
			)
		}, [])

		return (
			<Box
				{ ...props }
				aria-label={ ariaLabel || label }
				dir={ dir ?? globalConfigContext.rtl ? "rtl" : undefined }
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

				<RadioButtonInput
					{ ...radioButtonInputProps }
					role="none"
					defaultChecked={ defaultChecked }
					checked={ checked }
					value={ value }
					interactiveState={ interactiveState }
					onChange={ onChange }
					onPress={ onPress }
					style={ [
						baseStyle.radioButtonInput,
						radioButtonInputProps?.style,
					] }
					ref={ radioButtonInputRef }
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
			radioButtonInput: {
				zIndex: 2,
			},
			label: {
				marginStart: Spacing.spacing_03,
			},
		}),

	textColorStyle =
		CarbonStyleSheet.create<
			Record<RadioButtonInputInteractiveState, TextStyle>
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
