import {
	forwardRef,
	useContext,
} from "react"

import {
	StyleSheet,
} from "react-native"

import {
	Color,
	Spacing,
} from "@audira/carbon-react-native-elements"

import IconWarningAltFilled16 from "@carbon/icons/svg/32/warning--alt--filled.svg"
import IconWarningFilled16 from "@carbon/icons/svg/32/warning--filled.svg"

import {
	ThemeContext,
} from "../../contexts"

import {
	FlexStyleSheet,
} from "../../style-sheets"

import type {
	ThemeType,
} from "../../types"

import {
	FormHelperText,
} from "../form-helper-text"

import {
	FormLabel,
} from "../form-label"

import {
	TextAreaField,
} from "../text-area-field"

import type {
	TextAreaFluidProps,
} from "./TextAreaFluidProps"

import type {
	TextAreaFluidRef,
} from "./TextAreaFluidRef"

export const TextAreaFluid = forwardRef<TextAreaFluidRef, TextAreaFluidProps>(
	function TextAreaFluid(
		{
			label,
			helperText,
			interactiveState,
			style,
			textInputStyle,
			...textInputFieldProps
		},
		ref,
	) {

		const
			themeContext =
				useContext(ThemeContext)

		return (
			<TextAreaField
				ref={ ref }
				{ ...textInputFieldProps }
				interactiveState={ interactiveState }
				hideInteractiveStateIcon
				blockStartNode={
					<FormLabel
						label={ label }
						style={ styleSheet.label }
					/>
				}
				blockEndNode={
					!!helperText?.length && (
						<FormHelperText
							text={ helperText }
							style={ [
								FlexStyleSheet.flex_initial,
								styleSheet.helperText,
							] }
							textTrailing={
								interactiveState === "invalid" ? (
									<IconWarningFilled16
										width={ 16 }
										height={ 16 }
										fill={ mapIconInvalidColor[themeContext.colorScheme] }
									/>
								) : interactiveState === "warning" ? (
									<IconWarningAltFilled16
										width={ 16 }
										height={ 16 }
										fill={ mapIconWarningColor[themeContext.colorScheme] }
									/>
								) : undefined
							}
						/>
					)
				}
				style={ [
					styleSheet.textAreaFluid,
					style,
				] }
				textInputStyle={ [
					helperText?.length
						? styleSheet.rnTextInputNoBorderBottom
						: undefined,
					textInputStyle,
				] }
			/>
		)

	},
)

const
	styleSheet =
		StyleSheet.create({
			textAreaFluid: {
				paddingTop: 13,
				minHeight: 64 + 11,
			},
			label: {
				paddingLeft: Spacing.spacing_05,
				paddingRight: Spacing.spacing_05,
			},
			rnTextInputNoBorderBottom: {
				marginLeft: Spacing.spacing_05,
				marginRight: Spacing.spacing_05,
				paddingLeft: 0,
				paddingRight: 0,
			},
			helperText: {
				justifyContent: "space-between",
				paddingTop: Spacing.spacing_03,
				paddingBottom: Spacing.spacing_03,
				paddingLeft: Spacing.spacing_05,
				paddingRight: Spacing.spacing_05,
			},
		}),

	mapIconInvalidColor: Record<ThemeType.ColorScheme, string> =
		{
			gray_10: Color.Token.gray_10.support_error,
			gray_100: Color.Token.gray_100.support_error,
		},

	mapIconWarningColor: Record<ThemeType.ColorScheme, string> =
		{
			gray_10: Color.Token.gray_10.support_warning,
			gray_100: Color.Token.gray_100.support_warning,
		}
