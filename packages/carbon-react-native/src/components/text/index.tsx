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
	Typography,
	type TypeSetsToken,
	type TypeSets,
} from '@audira/carbon-react-native-elements'

import {
	ThemeContext,
} from '../../contexts'

import {
	TextStyle,
} from '../../styles'

export interface TextProps extends CoreProps {
	type?: TypeSetsToken,
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
					getTypeSets(type, italic),
					style,
				] }
				ref={ ref }
			/>
		)

	},
)

type TypeSetsWithFamily =
	Record<TypeSetsToken, TypeSets & { fontFamily: string }>

const
	mapFamilyStyle: Record<string, { fontFamily: string, fontWeight: TypeSets['fontWeight'] }> =
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
						] ?? TextStyle.normal
					),
				}
				return accumulator
			}, {} as TypeSetsWithFamily),
		)
	},

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
