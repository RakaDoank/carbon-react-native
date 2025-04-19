import {
	StyleSheet,
	type ImageStyle,
	type TextStyle,
	type ViewStyle,
} from 'react-native'

import {
	Color,
	type ColorToken,
} from '@audira/carbon-react-native-elements'

import {
	ColorSchemeGlobal,
} from '../globals'

import type {
	ThemeType,
} from '../types'

type Style = ViewStyle | TextStyle | ImageStyle

export function create<Styles extends Record<string, Style> = Record<string, Style>>(
	styles: Styles,
): Styles {
	const
		baseStyle: Record<string, Style> =
			{},

		coloredStyle: Record<string, Style> =
			{}

	for(const styleName in styles) {
		const style = styles[styleName]

		for(const styleProp_ in style) {
			const styleProp = styleProp_ as keyof Style

			if(colorStyleProps.indexOf(styleProp) > -1) {
				const
					coloredStyleName_G10 =
						`${prefixColorStyleName.gray_10}${styleName}`,

					coloredStyleName_G100 =
						`${prefixColorStyleName.gray_100}${styleName}`

				if(!coloredStyle[coloredStyleName_G10]) {
					coloredStyle[coloredStyleName_G10] = {}
				}
				if(!coloredStyle[coloredStyleName_G100]) {
					coloredStyle[coloredStyleName_G100] = {}
				}

				const
					colorStr =
						style[styleProp] as string

				coloredStyle[coloredStyleName_G10][styleProp] =
					Color.Token.gray_10[colorStr as ColorToken] as never ||
					colorStr

				coloredStyle[coloredStyleName_G100][styleProp] =
					Color.Token.gray_100[colorStr as ColorToken] as never ||
					colorStr
			} else {
				baseStyle[styleName] = style
			}
		}
	}

	const
		baseStyleSheet =
			StyleSheet.create<Record<string, Style>>(baseStyle),

		coloredStyleSheet =
			StyleSheet.create<Record<string, Style>>(coloredStyle)

	return Object.keys(styles)
		.reduce<Styles>((
			acc,
			styleName,
		) => {
			Object.defineProperty(acc, styleName, {
				get() {
					const colorScheme = ColorSchemeGlobal.get()

					if(colorScheme == 'gray_10') {
						return [
							baseStyleSheet[styleName],
							coloredStyleSheet[`${prefixColorStyleName.gray_10}${styleName}`],
						]
					}

					return [
						baseStyle[styleName],
						coloredStyleSheet[`${prefixColorStyleName.gray_100}${styleName}`],
					]
				},
			})
			return acc
		}, {} as never)
}

const
	colorStyleProps: ((keyof ViewStyle) | (keyof TextStyle) | (keyof ImageStyle))[] =
		[
			'color',
			'backgroundColor',
			'tintColor',
			'shadowColor',
			'textDecorationColor',
			'textShadowColor',
			'overlayColor',
			'borderColor',
			'borderEndColor',
			'borderStartColor',
			'borderTopColor',
			'borderBottomColor',
			'borderLeftColor',
			'borderRightColor',
			'borderBlockColor',
			'borderBlockEndColor',
			'borderBlockStartColor',
		],

	prefixColorStyleName: Record<ThemeType.ColorScheme, string> =
		{
			gray_10: 'gray_10__',
			gray_100: 'gray_100__',
		}
