import {
	forwardRef,
	useContext,
} from "react"

import {
	StyleSheet,
	type TextStyle,
	type ViewStyle,
} from "react-native"

import {
	Color,
	Spacing,
} from "@audira/carbon-react-native-elements"

import {
	CarbonStyleSheet,
} from "../../../carbon-style-sheet"

import {
	ThemeContext,
} from "../../../contexts"

import {
	BaseColor,
	type BaseColorProps,
	type BaseColorState,
} from "../base-color"

import type {
	GhostProps,
} from "./GhostProps"

import type {
	GhostRef,
} from "./GhostRef"

export const Ghost = forwardRef<GhostRef, GhostProps>(
	function Ghost(
		{
			text,
			iconProps,
			...props
		},
		ref,
	) {

		const
			themeContext =
				useContext(ThemeContext)

		return (
			<BaseColor
				{ ...props }
				ref={ ref }
				text={ text }
				android_rippleEffectColor={ mapAndroidRippleEffectColor[themeContext.colorScheme] }
				colorStateStyle={{
					background: {
						default: backgroundStyleSheet.default,
						focused: backgroundStyleSheet.focused,
						hovered: backgroundStyleSheet.hovered,
						pressed: backgroundStyleSheet.pressed,
						disabled: backgroundStyleSheet.disabled,
					},
					text: {
						default: textStyleSheet.default,
						focused: textStyleSheet.focused,
						hovered: textStyleSheet.hovered,
						pressed: textStyleSheet.pressed,
						disabled: textStyleSheet.disabled,
					},
					icon: mapIconColor[themeContext.colorScheme],
				}}
				iconProps={{
					...iconProps,
					style: [mapIconPLByText[`${!!text}`], iconProps?.style],
				}}
			/>
		)

	},
)

const
	backgroundStyleSheet =
		CarbonStyleSheet.create<
			Record<keyof BaseColorProps["colorStateStyle"]["background"], ViewStyle>
		>({
			default: {
				backgroundColor: "transparent",
			},
			focused: {
				borderWidth: 1,
				borderColor: CarbonStyleSheet.color.focus,
			},
			hovered: {
				backgroundColor: CarbonStyleSheet.color.background_hover,
			},
			pressed: {
				backgroundColor: CarbonStyleSheet.color.background_active,
			},
			disabled: {
				backgroundColor: "transparent",
			},
		}),

	textStyleSheet =
		CarbonStyleSheet.create<
			Record<keyof BaseColorProps["colorStateStyle"]["text"], TextStyle>
		>({
			default: {
				color: CarbonStyleSheet.color.link_primary,
			},
			focused: {
				color: CarbonStyleSheet.color.link_primary,
			},
			hovered: {
				color: CarbonStyleSheet.color.link_primary_hover,
			},
			pressed: {
				color: CarbonStyleSheet.color.link_primary,
			},
			disabled: {
				color: CarbonStyleSheet.color.text_disabled,
			},
		}),

	style =
		StyleSheet.create({
			iconPL8: {
				paddingLeft: Spacing.spacing_03,
			},
		}),

	mapIconPLByText: Record<string, typeof style["iconPL8"] | null> =
		{
			false: null,
			true: style.iconPL8,
		},

	mapIconColor: Record<ThemeContext["colorScheme"], Record<BaseColorState, string>> =
		{
			gray_10: {
				default: Color.Token.gray_10.link_primary,
				focused: Color.Token.gray_10.link_primary,
				hovered: Color.Token.gray_10.link_primary_hover,
				pressed: Color.Token.gray_10.link_primary,
				disabled: Color.Token.gray_10.icon_disabled,
			},
			gray_100: {
				default: Color.Token.gray_100.link_primary,
				focused: Color.Token.gray_100.link_primary,
				hovered: Color.Token.gray_100.link_primary_hover,
				pressed: Color.Token.gray_100.link_primary,
				disabled: Color.Token.gray_100.icon_disabled,
			},
		},

	mapAndroidRippleEffectColor: Record<ThemeContext["colorScheme"], string> =
		{
			gray_10: Color.Token.gray_10.background_active,
			gray_100: Color.Token.gray_100.background_active,
		}
