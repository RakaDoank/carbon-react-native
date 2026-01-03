import {
	forwardRef,
	useContext,
} from "react"

import {
	StyleSheet,
	View,
} from "react-native"

import {
	GlobalConfigContext,
} from "../../_internal/contexts"

import {
	CommonStyleSheet,
	FlexStyleSheet,
} from "../../_internal/style-sheets"

import {
	Text,
} from "../text"

import type {
	FormLabelProps,
} from "./FormLabelProps"

import type {
	FormLabelRef,
} from "./FormLabelRef"

export const FormLabel = forwardRef<FormLabelRef, FormLabelProps>(
	function FormLabel(
		{
			label,
			labelLeading,
			labelTrailing,
			textProps,
			style,
			dir,
			...props
		},
		ref,
	) {

		const
			globalConfigContext =
				useContext(GlobalConfigContext)

		return (
			<View
				{ ...props }
				ref={ ref }
				dir={ dir ?? globalConfigContext.rtl ? "rtl" : undefined }
				style={ [
					FlexStyleSheet.flex_row,
					baseStyle.gap,
					globalConfigContext.rtl ? CommonStyleSheet.rtl : undefined,
					style,
				] }
			>
				{ labelLeading }

				<Text
					{ ...textProps }
					type={ textProps?.type || "label_01" }
					aria-label={ label }
				>
					{ label }
				</Text>

				{ labelTrailing }
			</View>
		)

	},
)

const
	baseStyle =
		StyleSheet.create({
			gap: {
				columnGap: 8,
			},
		})
