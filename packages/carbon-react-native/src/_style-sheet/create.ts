import {
	StyleSheet,
	type ImageStyle,
	type TextStyle,
	type ViewStyle,
} from 'react-native'

import {
	Color,
	type BreakpointToken,
	type ColorToken,
} from '@audira/carbon-react-native-elements'

import {
	BreakpointGlobal,
	ColorSchemeGlobal,
} from '../globals'

import type {
	ThemeType,
} from '../types'

import {
	breakpoint as breakpointStyleProps,
} from './breakpoint'

type Style = ViewStyle & TextStyle & ImageStyle
type StyleBreakpoint =
	Partial<
		Record<
			BreakpointToken,
			Omit<
				ViewStyle & TextStyle & ImageStyle,
				(typeof colorStyleProps)[number]
			>
		>
	>

/**
 * Create style sheet to help using color token of current color scheme and current breakpoint declaratively.  
 * It makes your code way more shorter which doesn't need to create conditional of current color scheme or current breakpoint in the style prop implementation
 * 
 * @example
 * ```tsx
 * import {
 * 	View,
 * } from 'react-native'
 * 
 * import {
 * 	StyleSheet,
 * } from '@audira/carbon-react-native'
 * 
 * export function Component({ children }) {
 * 	return (
 * 		<View style={ style.foo }>
 * 			{ children }
 * 		<View>
 * 	)
 * }
 * 
 * const style = StyleSheet.create({
 * 	foo: {
 * 		backgroundColor: StyleSheet.color.background_inverse,
 * 		// it will be resolved to the `background_inverse` of current color scheme
 * 
 * 		[StyleSheet.breakpoint.medium]: {
 * 			flexDirection: 'row',
 * 			// this style will has row direction of flex box
 * 			// for screen that equal and larger than the medium breakpoint
 * 		},
 * 	},
 * })
 * ```
 */
export function create<Styles extends Record<string, Style | StyleBreakpoint> = Record<string, Style | StyleBreakpoint>>(
	styles: Styles,
): Styles {
	const
		normalStyle: Record<string, Style> =
			{},

		coloredStyle: Record<string, Style> =
			{},

		breakpointStyle: Record<string, Style> =
			{}

	let containBreakpointStyle = false

	for(const name in styles) {
		const style = styles[name]

		for(const _styleProp_ in style) {
			if((breakpointStyleProps as Record<string, string>)[_styleProp_]) {

				containBreakpointStyle = true
				breakpointStyle[`${_styleProp_}${name}`] = (style as StyleBreakpoint)[_styleProp_] as Style

			} else if(colorStyleProps.indexOf(_styleProp_ as keyof Style) > -1) {

				/**
				 * Resolve color string to the Carbon color (if any) for style prop or attribute that contain 'color' in the name like 'color', 'backgroundColor', 'borderColor', etc
				 * @see {@link colorStyleProps}
				 */

				const
					styleProp =
						_styleProp_ as (typeof colorStyleProps)[number],

					coloredStyleName_G10 =
						`${prefixColorStyleName.gray_10}${name}`,

					coloredStyleName_G100 =
						`${prefixColorStyleName.gray_100}${name}`

				if(!coloredStyle[coloredStyleName_G10]) {
					coloredStyle[coloredStyleName_G10] = {}
				}
				if(!coloredStyle[coloredStyleName_G100]) {
					coloredStyle[coloredStyleName_G100] = {}
				}

				const colorStr = (style as Style)[styleProp] as string

				coloredStyle[coloredStyleName_G10][styleProp] =
					Color.Token.gray_10.all[colorStr as ColorToken] as never ||
					colorStr

				coloredStyle[coloredStyleName_G100][styleProp] =
					Color.Token.gray_100.all[colorStr as ColorToken] as never ||
					colorStr

			} else {

				normalStyle[name] = style as Style

			}
		}
	}

	const
		normalStyleSheet =
			StyleSheet.create<Record<string, Style>>(normalStyle),

		coloredStyleSheet =
			StyleSheet.create<Record<string, Style>>(coloredStyle),

		breakpointStyleSheet =
			StyleSheet.create<Record<string, Style>>(breakpointStyle)

	return Object.keys(styles)
		.reduce<Styles>((
			acc,
			styleName,
		) => {
			Object.defineProperty(acc, styleName, {
				get() {
					const
						colorScheme =
							ColorSchemeGlobal.get(),

						breakpoint =
							BreakpointGlobal.get()

					return [
						normalStyleSheet[styleName],

						colorScheme == 'gray_10'
							? coloredStyleSheet[`${prefixColorStyleName.gray_10}${styleName}`]
							: coloredStyleSheet[`${prefixColorStyleName.gray_100}${styleName}`],

						containBreakpointStyle
							? breakpointStyleSheet[`${breakpoint}${styleName}`] ||
								getBreakpointUpStyle(breakpoint, breakpointStyleSheet, styleName)
							: null,
					]
				},
			})
			return acc
		}, {} as Styles)
}

const
	colorStyleProps: ((keyof ViewStyle) | (keyof TextStyle) | (keyof ImageStyle))[] =
		[
			'backgroundColor',
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
			'color',
			'outlineColor',
			'overlayColor',
			'textDecorationColor',
			'textShadowColor',
			'tintColor',
			'shadowColor',
		] as const,

	prefixColorStyleName: Record<ThemeType.ColorScheme, string> =
		{
			gray_10: 'gray_10__',
			gray_100: 'gray_100__',
		},

	breakpointDown: BreakpointToken[] =
		['max', 'x_large', 'large', 'medium', 'small']

function getBreakpointUpStyle(
	breakpoint: BreakpointToken,
	breakpointStyle: Record<string, Style>,
	styleName: string,
): Style | null {
	const bpSliced = breakpointDown.slice(breakpointDown.indexOf(breakpoint))
	let style: Style | null = null

	for(let i = 0; i < bpSliced.length; i++) {
		const bpStyle = breakpointStyle[`${bpSliced[i]}${styleName}`]
		if(bpStyle) {
			style = bpStyle
			break
		}
	}

	return style
}
