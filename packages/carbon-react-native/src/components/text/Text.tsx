import {
	forwardRef,
	useContext,
} from 'react'

import {
	StyleSheet,
	Text as Core,
} from 'react-native'

import {
	Typography,
	type TypeSets,
	type TypeSetsToken,
} from '@audira/carbon-react-native-elements'

import {
	TextStyleSheet,
} from '../../_internal/style-sheets'
import {
	CarbonStyleSheet,
} from '../../carbon-style-sheet'

import {
	ThemeContext,
} from '../../contexts'


import type {
	TextProps,
} from './TextProps'

import type {
	TextRef,
} from './TextRef'

export const Text = forwardRef<TextRef, TextProps>(
	function Text_(
		{
			type,
			italic = false,
			style,
			...props
		},
		ref,
	) {

		useContext(ThemeContext)

		return (
			<Core
				{ ...props }
				style={ [
					carbonStyle.text,
					getTypeSets(type, italic),
					style,
				] }
				ref={ ref }
			/>
		)

	},
)

type TypeSetsWithFamily =
	Record<TypeSetsToken, TypeSets & {
		fontFamily: string
	}>

const
	mapFamilyStyle: Record<string, {
		fontFamily: string, fontWeight: TypeSets['fontWeight']
	}> =
		{
			'100': TextStyleSheet.thin,
			'100_italic': TextStyleSheet.thin_italic,
			'200': TextStyleSheet.extralight,
			'200_italic': TextStyleSheet.extralight_italic,
			'300': TextStyleSheet.light,
			'300_italic': TextStyleSheet.light,
			'400': TextStyleSheet.normal,
			'400_italic': TextStyleSheet.normal_italic,
			'500': TextStyleSheet.medium,
			'500_italic': TextStyleSheet.medium_italic,
			'600': TextStyleSheet.semibold,
			'600_italic': TextStyleSheet.semibold_italic,
			'700': TextStyleSheet.bold,
			'700_italic': TextStyleSheet.bold_italic,
		},

	createTypeSets = (italic?: boolean) => {
		return StyleSheet.create<TypeSetsWithFamily>(
			Object.entries(Typography.TypeSets).reduce((
				accumulator: TypeSetsWithFamily,
				[key_, val],
			) => {
				const
					key =
						key_ as keyof TypeSetsWithFamily

				accumulator[key] = {
					...val,
					...(
						mapFamilyStyle[
							italic
								? `${val.fontWeight}_italic`
								: val.fontWeight
						] ?? TextStyleSheet.normal
					),
				}
				return accumulator
			}, {
			} as TypeSetsWithFamily),
		)
	},

	carbonStyle =
		CarbonStyleSheet.create({
			text: {
				color: CarbonStyleSheet.color.text_primary,
			},
		}),

	TypeSets =
		createTypeSets(),

	typeSetsItalicStyle =
		createTypeSets(true)

function getTypeSets(
	type?: TextProps['type'],
	italic?: boolean,
) {
	if(!type) {
		return null
	}

	if(italic) {
		return typeSetsItalicStyle[type]
	}

	return TypeSets[type]
}
