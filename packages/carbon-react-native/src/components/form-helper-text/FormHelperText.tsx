import {
	forwardRef,
	useContext,
} from "react"

import {
	StyleSheet,
} from "react-native"

import {
	CarbonStyleSheet,
} from "../../carbon-style-sheet"

import {
	ThemeContext,
} from "../../contexts"

import {
	FlexStyleSheet,
} from "../../style-sheets"

import {
	Box,
} from "../box"

import {
	Text,
} from "../text"

import type {
	FormHelperTextProps,
} from "./FormHelperTextProps"

import type {
	FormHelperTextRef,
} from "./FormHelperTextRef"

export const FormHelperText = forwardRef<FormHelperTextRef, FormHelperTextProps>(
	function FormHelperText(
		{
			error,
			text,
			textLeading,
			textTrailing,
			textProps,
			style,
			...props
		},
		ref,
	) {

		useContext(ThemeContext)

		return (
			<Box
				{ ...props }
				ref={ ref }
				style={ [
					FlexStyleSheet.flex_row,
					baseStyle.container,
					style,
				] }
			>
				{ textLeading }

				<Text
					{ ...textProps }
					type={ textProps?.type || "helper_text_01" }
					style={ [
						error ? carbonStyle.textError : carbonStyle.text,
						textProps?.style,
					] }
				>
					{ text }
				</Text>

				{ textTrailing }
			</Box>
		)

	},
)

const
	baseStyle =
		StyleSheet.create({
			container: {
				gap: 8,
			},
		}),

	carbonStyle =
		CarbonStyleSheet.create({
			text: {
				color: CarbonStyleSheet.color.text_primary,
			},
			textError: {
				color: CarbonStyleSheet.color.text_error,
			},
		})
