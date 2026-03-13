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

import * as CarbonStyleSheet from "../../carbon-style-sheet"

import {
	ThemeContext,
} from "../../contexts"

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
					globalConfigContext.rtl ? CarbonStyleSheet.g.rtl : undefined,
					style,
				] }
				ref={ ref }
			/>
		)

	},
)

type WeightType = NonNullable<TextProps["weight"]>

const
	mapWeightToFamilyStyle: {
		[Weight in WeightType]: {
			fontFamily: string,
		}
	} =
		{
			100: CarbonStyleSheet.g.font_thin,
			200: CarbonStyleSheet.g.font_extralight,
			300: CarbonStyleSheet.g.font_light,
			400: CarbonStyleSheet.g.font_regular,
			500: CarbonStyleSheet.g.font_medium,
			600: CarbonStyleSheet.g.font_semibold,
			700: CarbonStyleSheet.g.font_bold,
			800: CarbonStyleSheet.g.font_bold,
			900: CarbonStyleSheet.g.font_bold,
		},

	mapWeightItalicFamilyStyle: {
		[Weight in WeightType]: {
			fontFamily: string,
		}
	} =
		{
			100: CarbonStyleSheet.g.font_thin_italic,
			200: CarbonStyleSheet.g.font_extralight_italic,
			300: CarbonStyleSheet.g.font_light_italic,
			400: CarbonStyleSheet.g.font_regular_italic,
			500: CarbonStyleSheet.g.font_medium_italic,
			600: CarbonStyleSheet.g.font_semibold_italic,
			700: CarbonStyleSheet.g.font_bold_italic,
			800: CarbonStyleSheet.g.font_bold_italic,
			900: CarbonStyleSheet.g.font_bold_italic,
		},

	mapTypeStyleSheet =
		{
			body_01: CarbonStyleSheet.g.text_body_01,
			body_02: CarbonStyleSheet.g.text_body_02,
			body_compact_01: CarbonStyleSheet.g.text_body_compact_01,
			body_compact_02: CarbonStyleSheet.g.text_body_compact_02,
			code_01: CarbonStyleSheet.g.text_code_01,
			code_02: CarbonStyleSheet.g.text_code_02,
			heading_01: CarbonStyleSheet.g.text_heading_01,
			heading_02: CarbonStyleSheet.g.text_heading_02,
			heading_03: CarbonStyleSheet.g.text_heading_03,
			heading_04: CarbonStyleSheet.g.text_heading_04,
			heading_05: CarbonStyleSheet.g.text_heading_05,
			heading_06: CarbonStyleSheet.g.text_heading_06,
			heading_07: CarbonStyleSheet.g.text_heading_07,
			heading_compact_01: CarbonStyleSheet.g.text_heading_compact_01,
			heading_compact_02: CarbonStyleSheet.g.text_heading_compact_02,
			helper_text_01: CarbonStyleSheet.g.text_helper_text_01,
			helper_text_02: CarbonStyleSheet.g.text_helper_text_02,
			label_01: CarbonStyleSheet.g.text_label_01,
			label_02: CarbonStyleSheet.g.text_label_02,
			legal_01: CarbonStyleSheet.g.text_legal_01,
			legal_02: CarbonStyleSheet.g.text_legal_02,
		} as const satisfies {
			[Type in NonNullable<TextProps["type"]>]: TextStyle
		},

	mapFontFamilyToWeightNumber: Record<string, NonNullable<TextProps["weight"]>> =
		{
			[CarbonStyleSheet.gObject.font_thin.fontFamily]: 100,
			[CarbonStyleSheet.gObject.font_extralight.fontFamily]: 200,
			[CarbonStyleSheet.gObject.font_light.fontFamily]: 300,
			[CarbonStyleSheet.gObject.font_regular.fontFamily]: 400,
			[CarbonStyleSheet.gObject.font_medium.fontFamily]: 500,
			[CarbonStyleSheet.gObject.font_semibold.fontFamily]: 600,
			[CarbonStyleSheet.gObject.font_bold.fontFamily]: 700,
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
		typeStyleSheet =
			mapTypeStyleSheet[type]

	if(italic && overrideWeight) {
		return [typeStyleSheet, mapWeightItalicFamilyStyle[overrideWeight]]
	}

	if(italic) {
		return [
			typeStyleSheet,
			mapWeightItalicFamilyStyle[
				mapFontFamilyToWeightNumber[typeStyleSheet.fontFamily]!
			],
		]
	}

	if(overrideWeight) {
		return [typeStyleSheet, mapWeightToFamilyStyle[overrideWeight]]
	}

	return typeStyleSheet
}
