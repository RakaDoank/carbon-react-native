import {
	forwardRef,
	useContext,
} from "react"

import {
	StyleSheet,
	Text as Core,
	type StyleProp,
	type TextStyle,
} from "react-native"

import {
	Typography,
	type TypeSetsToken,
} from "@audira/carbon-react-native-elements"

import {
	GlobalConfigContext,
} from "../../_internal/contexts"

import {
	CommonStyleSheet,
	TextStyleSheet,
} from "../../_internal/style-sheets"

import {
	CarbonStyleSheet,
} from "../../carbon-style-sheet"

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
					getFontStyle(type, italic, weight),
					globalConfigContext.rtl ? CommonStyleSheet.rtl : undefined,
					style,
				] }
				ref={ ref }
			/>
		)

	},
)

type TypeSetsStyle = Record<TypeSetsToken, TextStyle>
type WeightType = NonNullable<TextProps["weight"]>

const
	mapFamilyStyle: {
		[Weight in WeightType]: TextStyle
	} =
		{
			100: TextStyleSheet.thin,
			200: TextStyleSheet.extralight,
			300: TextStyleSheet.light,
			400: TextStyleSheet.normal,
			500: TextStyleSheet.medium,
			600: TextStyleSheet.semibold,
			700: TextStyleSheet.bold,
			800: TextStyleSheet.bold,
			900: TextStyleSheet.bold,
		},

	mapFamilyItalicStyle: {
		[Weight in WeightType]: TextStyle
	} =
		{
			100: TextStyleSheet.thin_italic,
			200: TextStyleSheet.extralight_italic,
			300: TextStyleSheet.light_italic,
			400: TextStyleSheet.normal_italic,
			500: TextStyleSheet.medium_italic,
			600: TextStyleSheet.semibold_italic,
			700: TextStyleSheet.bold_italic,
			800: TextStyleSheet.bold_italic,
			900: TextStyleSheet.bold_italic,
		},

	createTypeSetsStyle = (italic?: boolean) => {
		return StyleSheet.create<TypeSetsStyle>(
			Object.entries(Typography.TypeSets).reduce((
				accumulator: TypeSetsStyle,
				[key_, val],
			) => {
				const
					key =
						key_ as keyof TypeSetsStyle

				accumulator[key] = {
					...val,
					...(
						italic
							? mapFamilyItalicStyle[val.fontWeight]
							: mapFamilyStyle[val.fontWeight]
					),
				}
				return accumulator
			}, {} as TypeSetsStyle),
		)
	},

	carbonStyle =
		CarbonStyleSheet.create({
			text: {
				color: CarbonStyleSheet.color.text_primary,
			},
		}),

	typeSetsStyle =
		createTypeSetsStyle(),

	typeSetsItalicStyle =
		createTypeSetsStyle(true)

function getFontStyle(
	type?: TextProps["type"],
	italic?: boolean,
	overrideWeight?: TextProps["weight"],
): StyleProp<TextStyle> {
	if(!type) {
		return null
	}

	if(italic && overrideWeight) {
		return [typeSetsItalicStyle[type], mapFamilyItalicStyle[overrideWeight]]
	}

	if(italic) {
		return typeSetsItalicStyle[type]
	}

	if(overrideWeight) {
		return [typeSetsStyle[type], mapFamilyStyle[overrideWeight]]
	}

	return typeSetsStyle[type]
}
