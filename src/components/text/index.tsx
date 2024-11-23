import {
	forwardRef,
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

		return (
			<Core
				{ ...props }
				style={ [
					getTypeSetsStyle(type, italic),
					style,
				] }
				ref={ ref }
			/>
		)

	}
)

type TypeSetsStyleWithFamily =
	Record<TypographyType.TypeSetsClass, Omit<TypographyType.TypeSetsStyle, 'fontWeight'> & { fontFamily: string }>

const

	mapFamilyStyle: Record<string, { fontFamily: string }> =
		{
			'100': TextStyle.THIN,
			'100_italic': TextStyle.THIN_ITALIC,
			'200': TextStyle.EXTRALIGHT,
			'200_italic': TextStyle.EXTRALIGHT_ITALIC,
			'300': TextStyle.LIGHT,
			'300_italic': TextStyle.LIGHT,
			'400': TextStyle.NORMAL,
			'400_italic': TextStyle.NORMAL_ITALIC,
			'500': TextStyle.MEDIUM,
			'500_italic': TextStyle.MEDIUM_ITALIC,
			'600': TextStyle.SEMIBOLD,
			'600_italic': TextStyle.SEMIBOLD_ITALIC,
			'700': TextStyle.BOLD,
			'700_italic': TextStyle.BOLD_ITALIC,
		},

	createTypeSetsStyle = (italic?: boolean) => {
		return StyleSheet.create<TypeSetsStyleWithFamily>(
			Object.entries(TypographyConstant.TypeSets).reduce((
				accumulator: TypeSetsStyleWithFamily,
				[key_, val_]
			) => {
				const
					key =
						key_ as keyof TypeSetsStyleWithFamily,

					val =
						val_ as TypographyType.TypeSetsStyle

				accumulator[key] = {
					...val,
					...(
						mapFamilyStyle[
							italic
								? `${val.fontWeight}_italic`
								: val.fontWeight
						] ?? TextStyle.NORMAL
					),
				}
				return accumulator
			}, {} as TypeSetsStyleWithFamily)
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
