import {
	forwardRef,
	useContext,
} from "react"

import {
	StyleSheet,
	View,
} from "react-native"

import {
	Color,
} from "@audira/carbon-react-native-elements"

import IconCheckmarkFilled from "@carbon/icons/svg/32/checkmark--filled.svg"
import IconErrorFilled from "@carbon/icons/svg/32/error--filled.svg"

import {
	GlobalConfigContext,
} from "../../_internal/contexts"

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

import {
	Loading,
} from "../loading"

import {
	Text,
} from "../text"

import type {
	InlineLoadingProps,
} from "./InlineLoadingProps"

import type {
	InlineLoadingRef,
} from "./InlineLoadingRef"

export const InlineLoading = forwardRef<InlineLoadingRef, InlineLoadingProps>(
	function InlineLoading(
		{
			state = "active",
			text,
			style,
			"aria-label": ariaLabel,
			textProps,
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
			<View
				ref={ ref }
				{ ...props }
				aria-label={ ariaLabel ?? text }
				dir={ dir ?? globalConfigContext.rtl ? "rtl" : undefined }
				style={ [
					FlexStyleSheet.flex_row,
					FlexStyleSheet.items_center,
					styleSheet.inlineLoading,
					globalConfigContext.rtl ? CommonStyleSheet.rtl : undefined,
					style,
				] }
			>
				{ state == "active" ? (
					<Loading
						type="small"
					/>
				) : state == "error" ? (
					<IconErrorFilled
						width={ 16 }
						height={ 16 }
						fill={ mapIconErrorColor[themeContext.colorScheme] }
					/>
				) : state == "finished" ? (
					<IconCheckmarkFilled
						width={ 16 }
						height={ 16 }
						fill={ mapIconCheckmarkColor[themeContext.colorScheme] }
					/>
				) : null }

				{ !!text && (
					<Text
						{ ...textProps }
						type="body_compact_01"
						style={ [carbonStyleSheet.text, textProps?.style] }
					>
						{ text }
					</Text>
				) }
			</View>
		)

	},
)

const
	styleSheet =
		StyleSheet.create({
			inlineLoading: {
				columnGap: 8,
			},
		}),

	carbonStyleSheet =
		CarbonStyleSheet.create({
			text: {
				color: CarbonStyleSheet.color.text_secondary,
			},
		}),

	mapIconErrorColor: Record<ThemeContext["colorScheme"], string> =
		{
			gray_10: Color.Token.gray_10.support_error,
			gray_100: Color.Token.gray_100.support_error,
		},

	mapIconCheckmarkColor: Record<ThemeContext["colorScheme"], string> =
		{
			gray_10: Color.Token.gray_10.support_success,
			gray_100: Color.Token.gray_100.support_success,
		}
