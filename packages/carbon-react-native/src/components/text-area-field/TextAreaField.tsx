import {
	forwardRef,
} from "react"

import {
	Platform,
	StyleSheet,
} from "react-native"

import {
	Spacing,
	Typography,
} from "@audira/carbon-react-native-elements"

import {
	TextInputField,
} from "../text-input-field"

import type {
	TextAreaFieldProps,
} from "./TextAreaFieldProps"

import type {
	TextAreaFieldRef,
} from "./TextAreaFieldRef"

export const TextAreaField = forwardRef<TextAreaFieldRef, TextAreaFieldProps>(
	function(
		{
			style,
			textAlignVertical = "top",
			textInputStyle,
			...props
		},
		ref,
	) {

		return (
			<TextInputField
				ref={ ref }
				{ ...props }
				multiline
				textAlignVertical={ textAlignVertical }
				style={ [
					styleSheet.textAreaField,
					style,
				] }
				textInputStyle={ [
					styleSheet.rnTextInput,
					textInputStyle,
				] }
			/>
		)

	},
)

const
	styleSheet =
		StyleSheet.create({
			textAreaField: {
				height: "auto",
				minHeight: Spacing.spacing_08,
			},
			rnTextInput: {
				paddingTop: 11,
				paddingBottom: 11,
				height: Typography.TypeSets.body_compact_01.lineHeight * 4 + 22,
				...Platform.select({
					web: {
						resize: "vertical",
					},
				}),
			},
		})
