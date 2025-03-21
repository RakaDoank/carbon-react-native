import {
	forwardRef,
	useContext,
} from 'react'

import {
	Text as Core,
	StyleSheet,
	type TextProps as CoreProps,
} from 'react-native'

import {
	TypographyConstant,
} from '../../constants'

import {
	ThemeContext,
} from '../../contexts'

import {
	TextStyle,
} from '../../styles'

import type {
	TypographyType,
} from '../../types'

export interface TextProps extends CoreProps {
	type?: TypographyType.TypeSetsClass,
	italic?: boolean,
}

export const Text = forwardRef<Core, TextProps>(
	function Text_(
		{
			type,
			italic = false,
			style,
			...props
		},
		ref,
	) {

		const
			themeContext =
				useContext(ThemeContext)

		return (
			<Core
				{ ...props }
				style={ [
					{ color: themeContext.color.text_primary },
					getTypeSetsStyle(type, italic),
					style,
				] }
				ref={ ref }
			/>
		)

	},
)

type TypeSetsStyleWithFamily =
	Record<TypographyType.TypeSetsClass, TypographyType.TypeSetsStyle & { fontFamily: string }>

const
	mapFamilyStyle: Record<string, { fontFamily: string, fontWeight: TypographyType.TypeSetsStyle['fontWeight'] }> =
		{
			'100': TextStyle.thin,
			'100_italic': TextStyle.thin_italic,
			'200': TextStyle.extralight,
			'200_italic': TextStyle.extralight_italic,
			'300': TextStyle.light,
			'300_italic': TextStyle.light,
			'400': TextStyle.normal,
			'400_italic': TextStyle.normal_italic,
			'500': TextStyle.medium,
			'500_italic': TextStyle.medium_italic,
			'600': TextStyle.semibold,
			'600_italic': TextStyle.semibold_italic,
			'700': TextStyle.bold,
			'700_italic': TextStyle.bold_italic,
		},

	createTypeSetsStyle = (italic?: boolean) => {
		return StyleSheet.create<TypeSetsStyleWithFamily>(
			Object.entries(TypographyConstant.TypeSets).reduce((
				accumulator: TypeSetsStyleWithFamily,
				[key_, val_],
			) => {
				const
					key =
						key_ as keyof TypeSetsStyleWithFamily,

					val =
						/**
						 * i don't know why Typescript annotate here as TypopgrahyType.TypeSets
						 */
						(val_) as TypographyType.TypeSetsStyle

				accumulator[key] = {
					...val,
					...(
						mapFamilyStyle[
							italic
								? `${val.fontWeight}_italic`
								: val.fontWeight
						] ?? TextStyle.normal
					),
				}
				return accumulator
			}, {} as TypeSetsStyleWithFamily),
		)
	},

	typeSetsStyle =
		createTypeSetsStyle(),

	typeSetsItalicStyle =
		createTypeSetsStyle(true)

function getTypeSetsStyle(
	type?: TextProps['type'],
	italic?: boolean,
) {
	if(!type) {
		return null
	}

	if(italic) {
		return typeSetsItalicStyle[type]
	}

	return typeSetsStyle[type]
}
