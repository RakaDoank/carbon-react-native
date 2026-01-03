import {
	useContext,
} from "react"

import {
	View,
	type TextStyle,
	type ViewStyle,
} from "react-native"

import {
	Color,
} from "@audira/carbon-react-native-elements"

import {
	FlexStyleSheet,
} from "../../_internal/style-sheets"

import {
	CarbonStyleSheet,
} from "../../carbon-style-sheet"

import {
	ThemeContext,
} from "../../contexts"

import type {
	Size as ButtonSize,
} from "../button/Size"

import {
	BaseColor as ButtonColor,
	type BaseColorProps as ButtonColorProps,
	type BaseColorState as ButtonColorState,
} from "../button/base-color"

import type {
	AccordionHeaderProps,
} from "./AccordionHeaderProps"

import type {
	AccordionSize,
} from "./AccordionSize"

import {
	HeaderBorder,
} from "./_HeaderBorder"

import {
	Chevron,
} from "./_chevron"

export function Header({
	size = "medium",
	open,
	flushAlignment = false,
	text,
	style: styleProp,
	...buttonProps
}: AccordionHeaderProps) {

	const
		themeContext =
			useContext(ThemeContext)

	return (
		<View
			style={ styleProp }
		>
			{ /* The Border Box */ }
			<HeaderBorder
				flushAlignment={ flushAlignment }
			/>

			<ButtonColor
				{ ...buttonProps }
				size={ mapSizeToButtonSize[size] }
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
				iconNode={
					(...params) =>
						iconNodeRenderer(!!open, ...params)
				}
				style={ FlexStyleSheet.self_stretch }
			/>
		</View>
	)

}

const
	backgroundStyleSheet =
		CarbonStyleSheet.create<
			Record<keyof ButtonColorProps["colorStateStyle"]["background"], ViewStyle>
		>({
			default: {
				backgroundColor: "transparent",
			},
			focused: {
				backgroundColor: "transparent",
				borderWidth: 1,
				borderColor: CarbonStyleSheet.color.focus,
			},
			hovered: {
				backgroundColor: CarbonStyleSheet.color.layer_hover_01,
			},
			pressed: {
				backgroundColor: CarbonStyleSheet.color.layer_hover_01,
			},
			disabled: {
				backgroundColor: "transparent",
			},
		}),

	textStyleSheet =
		CarbonStyleSheet.create<
			Record<keyof ButtonColorProps["colorStateStyle"]["text"], TextStyle>
		>({
			default: {
				color: CarbonStyleSheet.color.text_primary,
			},
			focused: {
				color: CarbonStyleSheet.color.text_primary,
			},
			hovered: {
				color: CarbonStyleSheet.color.text_primary,
			},
			pressed: {
				color: CarbonStyleSheet.color.text_primary,
			},
			disabled: {
				color: CarbonStyleSheet.color.text_disabled,
			},
		}),

	mapIconColor: Record<ThemeContext["colorScheme"], Record<ButtonColorState, string>> =
		{
			gray_10: {
				default: Color.Token.gray_10.icon_primary,
				focused: Color.Token.gray_10.icon_primary,
				hovered: Color.Token.gray_10.icon_primary,
				pressed: Color.Token.gray_10.icon_primary,
				disabled: Color.Token.gray_10.icon_disabled,
			},
			gray_100: {
				default: Color.Token.gray_100.icon_primary,
				focused: Color.Token.gray_100.icon_primary,
				hovered: Color.Token.gray_100.icon_primary,
				pressed: Color.Token.gray_100.icon_primary,
				disabled: Color.Token.gray_100.icon_disabled,
			},
		},

	mapAndroidRippleEffectColor: Record<ThemeContext["colorScheme"], string> =
		{
			gray_10: Color.Token.gray_10.layer_hover_01,
			gray_100: Color.Token.gray_100.layer_hover_01,
		},

	/**
	 * Coincidentally (or not) use same value of height  
	 * https://carbondesignsystem.com/components/accordion/style/#sizes
	 */
	mapSizeToButtonSize: Record<AccordionSize, ButtonSize> =
		{
			small: "small",
			medium: "medium",
			large: "large_productive",
		},

	iconNodeRenderer: (
		open: boolean,
		...params: Parameters<NonNullable<ButtonColorProps["iconNode"]>>
	) => React.ReactNode =
		(open, iconColorState, iconSize, iconStyle) => {
			return (
				<Chevron
					open={ open }
					color={ iconColorState }
					size={ iconSize }
					style={ iconStyle }
				/>
			)
		}
