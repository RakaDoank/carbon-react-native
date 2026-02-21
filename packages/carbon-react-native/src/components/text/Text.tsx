import {
	forwardRef,
	useContext,
} from "react"

import {
	Text as Core,
	type StyleProp,
	type TextStyle,
} from "react-native"

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
	DirectionStyleSheet,
	FontStyleSheet,
	StyleSheetObj,
	TypographyStyleSheet,
} from "../../style-sheets"

import type {
	TextProps,
} from "./TextProps"

import type {
	TextRef,
} from "./TextRef"

export const Text = forwardRef<TextRef, TextProps>(
	function Text_(
		{
			type = "body_compact_02",
			italic = false,
			weight,
			style,
			dir,
			...props
		},
		ref,
	) {

		useContext(ThemeContext)

		const
			globalConfigContext =
				useContext(GlobalConfigContext)

		return (
			<Core
				{ ...props }
				dir={ dir ?? globalConfigContext.rtl ? "rtl" : undefined }
				style={ [
					carbonStyle.text,
					getTextStyle(type, italic, weight),
					globalConfigContext.rtl ? DirectionStyleSheet.rtl : undefined,
					style,
				] }
				ref={ ref }
			/>
		)

	},
)

type WeightType = NonNullable<TextProps["weight"]>

const
	mapFamilyStyle: {
		[Weight in WeightType]: TextStyle
	} =
		{
			100: FontStyleSheet.thin,
			200: FontStyleSheet.extralight,
			300: FontStyleSheet.light,
			400: FontStyleSheet.normal,
			500: FontStyleSheet.medium,
			600: FontStyleSheet.semibold,
			700: FontStyleSheet.bold,
			800: FontStyleSheet.bold,
			900: FontStyleSheet.bold,
		},

	mapFamilyItalicStyle: {
		[Weight in WeightType]: TextStyle
	} =
		{
			100: FontStyleSheet.thin_italic,
			200: FontStyleSheet.extralight_italic,
			300: FontStyleSheet.light_italic,
			400: FontStyleSheet.normal_italic,
			500: FontStyleSheet.medium_italic,
			600: FontStyleSheet.semibold_italic,
			700: FontStyleSheet.bold_italic,
			800: FontStyleSheet.bold_italic,
			900: FontStyleSheet.bold_italic,
		},

	carbonStyle =
		CarbonStyleSheet.create({
			text: {
				color: CarbonStyleSheet.color.text_primary,
			},
		})

function getTextStyle(
	type?: TextProps["type"],
	italic?: boolean,
	overrideWeight?: TextProps["weight"],
): StyleProp<TextStyle> {
	if(!type) {
		return null
	}

	const
		typographyStyle =
			TypographyStyleSheet[type],

		weight =
			StyleSheetObj.Typography[type].fontWeight

	if(italic && overrideWeight) {
		return [typographyStyle, mapFamilyItalicStyle[overrideWeight]]
	}

	if(italic) {
		return [typographyStyle, mapFamilyItalicStyle[weight]]
	}

	if(overrideWeight) {
		return [typographyStyle, mapFamilyStyle[overrideWeight]]
	}

	return [typographyStyle, mapFamilyStyle[weight]]
}
