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

import IconWarningAltFilled from "@carbon/icons/svg/32/warning--alt--filled.svg"
import IconWarningFilled from "@carbon/icons/svg/32/warning--filled.svg"

import {
	FlexStyleSheet,
} from "../../_internal/style-sheets"

import {
	ThemeContext,
} from "../../contexts"

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
	TextInputField,
} from "../text-input-field"

import type {
	TextInputFluidProps,
} from "./TextInputFluidProps"

import type {
	TextInputFluidRef,
} from "./TextInputFluidRef"

export const TextInputFluid = forwardRef<TextInputFluidRef, TextInputFluidProps>(
	function TextInputFluid(
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
			<TextInputField
				ref={ ref }
				{ ...textInputFieldProps }
				size="medium"
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
									<IconWarningFilled
										width={ 16 }
										height={ 16 }
										fill={ mapIconInvalidColor[themeContext.colorScheme] }
									/>
								) : interactiveState === "warning" ? (
									<IconWarningAltFilled
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
					styleSheet.textInputFluid,
					helperText?.length
						? styleSheet.textInputFieldHeight96
						: styleSheet.textInputFieldHeight64,
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
			textInputFluid: {
				paddingTop: 13,
			},
			textInputFieldHeight64: {
				height: Spacing.spacing_10,
			},
			textInputFieldHeight96: {
				minHeight: Spacing.spacing_12,
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
