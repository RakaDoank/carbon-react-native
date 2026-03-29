import {
	StyleSheet,
	type ImageStyle,
	type TextStyle,
	type ViewStyle,
} from "react-native"

import type {
	BreakpointToken,
} from "@audira/carbon-react-native-elements"

import {
	BreakpointGlobal,
	ColorSchemeGlobal,
} from "../_internal/globals"

import type {
	ThemeType,
} from "../types"

import {
	breakpoint as breakpointStyleProps,
} from "./breakpoint"

type Style = ViewStyle | TextStyle | ImageStyle

type StyleBreakpoint =
	Partial<
		Record<
			BreakpointToken,
			Omit<
				ViewStyle | TextStyle | ImageStyle,
				ColorStyleAttr
			>
		>
	>

type ColorStyleAttr = Extract<
	(keyof ViewStyle) | (keyof TextStyle) | (keyof ImageStyle),
	| "backgroundColor"
	| "borderColor"
	| "borderEndColor"
	| "borderStartColor"
	| "borderTopColor"
	| "borderBottomColor"
	| "borderLeftColor"
	| "borderRightColor"
	| "borderBlockColor"
	| "borderBlockEndColor"
	| "borderBlockStartColor"
	| "color"
	| "outlineColor"
	| "overlayColor"
	| "textDecorationColor"
	| "textShadowColor"
	| "tintColor"
	| "shadowColor"
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

		carbonColoredStyle: Record<string, Partial<Record<ColorStyleAttr, string>>> =
			{},

		breakpointStyle: Record<string, Style> =
			{}

	let containBreakpointStyle = false

	for(const name in styles) {
		const style = styles[name]

		for(const styleAttr in style) {
			if((breakpointStyleProps as Record<string, string>)[styleAttr]) {

				containBreakpointStyle = true
				breakpointStyle[`${styleAttr}${name}`] = (style as StyleBreakpoint)[styleAttr] as Style

			} else if(colorStyleAttrs[styleAttr as ColorStyleAttr]) {

				// Resolve color string to the Carbon color (if any) for style prop or attribute that contain 'color'
				// in the name like 'color', 'backgroundColor', 'borderColor', etc.,
				// and the color value contains "|"
				// If it does, it's a color token references that formatted in `gray_10|gray_100`

				// For instance,
				// if user want to modify `backgroundColor` with `CarbonStyleSheet.create` and using
				// `CarbonStyleSheet.color.background`
				// The `CarbonStyleSheet.color.background` itself is storing two color for gray_10 and gray_100
				// in single string, which is `#f4f4f4|#000000`
				// So we need to split them and make correct React Native StyleSheet
				// with the same style attribute, for gray_10 and gray_100

				const colorStr = (style as Record<ColorStyleAttr, string>)[styleAttr as ColorStyleAttr]

				/**
				 * It's color token references
				 * 
				 * For instance,
				 * `#f4f4f4|#000000`. It's formatted in `gray_10|gray_100`.
				 */
				const carbonColorToken = colorStr.split("|")

				if(carbonColorToken.length > 1) {
					const
						coloredStyleName_G10 =
							`${prefixColorStyleName.gray_10}${name}`,

						coloredStyleName_G100 =
							`${prefixColorStyleName.gray_100}${name}`

					if(!carbonColoredStyle[coloredStyleName_G10]) {
						carbonColoredStyle[coloredStyleName_G10] = {
						}
					}
					if(!carbonColoredStyle[coloredStyleName_G100]) {
						carbonColoredStyle[coloredStyleName_G100] = {
						}
					}

					const colorStyleAttr = styleAttr as ColorStyleAttr

					carbonColoredStyle[coloredStyleName_G10][colorStyleAttr] =
						carbonColorToken[0]

					carbonColoredStyle[coloredStyleName_G100][colorStyleAttr] =
						carbonColorToken[1]
				}
			} else {

				normalStyle[name] = style as Style

			}
		}
	}

	const
		normalStyleSheet =
			StyleSheet.create<Record<string, Style>>(normalStyle),

		coloredStyleSheet =
			StyleSheet.create<Record<string, Style>>(carbonColoredStyle),

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

						colorScheme == "gray_10"
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
		}, {
		} as Styles)
}

const
	colorStyleAttrs =
		{
			backgroundColor: "backgroundColor",
			borderColor: "borderColor",
			borderEndColor: "borderEndColor",
			borderStartColor: "borderStartColor",
			borderTopColor: "borderTopColor",
			borderBottomColor: "borderBottomColor",
			borderLeftColor: "borderLeftColor",
			borderRightColor: "borderRightColor",
			borderBlockColor: "borderBlockColor",
			borderBlockEndColor: "borderBlockEndColor",
			borderBlockStartColor: "borderBlockStartColor",
			color: "color",
			outlineColor: "outlineColor",
			overlayColor: "overlayColor",
			textDecorationColor: "textDecorationColor",
			textShadowColor: "textShadowColor",
			tintColor: "tintColor",
			shadowColor: "shadowColor",
		} as const satisfies {
			[Attr in ColorStyleAttr]: Attr
		},

	prefixColorStyleName: Record<ThemeType.ColorScheme, string> =
		{
			gray_10: "gray_10__",
			gray_100: "gray_100__",
		},

	breakpointDown: BreakpointToken[] =
		["max", "x_large", "large", "medium", "small"]

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
