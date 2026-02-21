import {
	forwardRef,
	useContext,
} from "react"

import {
	Platform,
	StyleSheet,
	TextInput,
	type TextStyle,
} from "react-native"

import {
	Color,
	Spacing,
	Typography,
} from "@audira/carbon-react-native-elements"

import {
	GlobalConfigContext,
} from "../../../_internal/contexts"

import {
	ThemeContext,
} from "../../../contexts"

import {
	DirectionStyleSheet,
} from "../../../style-sheets"

import type {
	ThemeType,
} from "../../../types"

import type {
	TextInputFieldInteractiveState,
} from "../TextInputFieldInteractiveState"

import type {
	RNTextInputProps,
} from "./RNTextInputProps"

import type {
	RNTextInputRef,
} from "./RNTextInputRef"

export const RNTextInput = forwardRef<RNTextInputRef, RNTextInputProps>(
	function RNTextInput(
		{
			interactiveState,
			editable,
			style,
			placeholderTextColor,
			dir,
			...props
		},
		ref,
	) {

		const
			themeContext =
				useContext(ThemeContext),

			globalConfigContext =
				useContext(GlobalConfigContext)

		return (
			<TextInput
				ref={ ref }
				{ ...props }
				editable={ interactiveState === "disabled" || interactiveState === "read_only" ? false : editable }
				placeholderTextColor={ placeholderTextColor ?? mapPlaceholderTextColor[themeContext.colorScheme] }
				dir={ dir ?? globalConfigContext.rtl ? "rtl" : undefined }
				style={ [
					styleSheet.rnTextInput as unknown as never, // FIXME: i don't know the correct type
					mapStateStyleSheet[themeContext.colorScheme][interactiveState],
					globalConfigContext.rtl ? DirectionStyleSheet.rtl : undefined,
					style,
				] }
			/>
		)

	},
)

const
	styleSheet =
		StyleSheet.create({
			rnTextInput: {
				flexGrow: 1,
				paddingLeft: Spacing.spacing_05,
				paddingRight: Spacing.spacing_05,
				backgroundColor: "transparent",
				borderBottomWidth: StyleSheet.hairlineWidth,
				borderStyle: "solid",
				fontFamily: "IBMPlexSans-Regular",
				fontSize: Typography.TypeSets.body_compact_01.fontSize,
				lineHeight: Typography.TypeSets.body_compact_01.lineHeight,
				...Platform.select({
					web: {
						outlineStyle: "none",
					},
				}),
			},
		}),

	/**
	 * The text color in the TextInput is not reactive with the `CarbonStyleSheet.create()`. So i have to map it manually.
	 */
	stateStyleSheet =
		StyleSheet.create<Record<`${ThemeType.ColorScheme}__${Exclude<TextInputFieldInteractiveState, "invalid" | "warning">}`, TextStyle>>({
			gray_10__normal: {
				color: Color.Token.gray_10.text_primary,
				borderBlockEndColor: Color.Token.gray_10.border_strong_01,
			},
			gray_10__disabled: {
				color: Color.Token.gray_10.text_disabled,
				borderBlockEndColor: "transparent",
			},
			gray_10__read_only: {
				color: Color.Token.gray_10.text_primary,
				borderBlockEndColor: Color.Token.gray_10.border_subtle_00,
			},

			gray_100__normal: {
				color: Color.Token.gray_100.text_primary,
				borderBlockEndColor: Color.Token.gray_100.border_strong_01,
			},
			gray_100__disabled: {
				color: Color.Token.gray_100.text_disabled,
				borderBlockEndColor: "transparent",
			},
			gray_100__read_only: {
				color: Color.Token.gray_100.text_primary,
				borderBlockEndColor: Color.Token.gray_100.border_subtle_00,
			},
		}),

	mapPlaceholderTextColor: Record<ThemeType.ColorScheme, string> =
		{
			gray_10: Color.Token.gray_10.text_placeholder,
			gray_100: Color.Token.gray_100.text_placeholder,
		},

	mapStateStyleSheet: Record<ThemeType.ColorScheme, Record<TextInputFieldInteractiveState, TextStyle>> =
		{
			gray_10: {
				normal: stateStyleSheet.gray_10__normal,
				disabled: stateStyleSheet.gray_10__disabled,
				read_only: stateStyleSheet.gray_10__read_only,
				invalid: stateStyleSheet.gray_10__normal,
				warning: stateStyleSheet.gray_10__normal,
			},
			gray_100: {
				normal: stateStyleSheet.gray_100__normal,
				disabled: stateStyleSheet.gray_100__disabled,
				read_only: stateStyleSheet.gray_100__read_only,
				invalid: stateStyleSheet.gray_100__normal,
				warning: stateStyleSheet.gray_100__normal,
			},
		}
