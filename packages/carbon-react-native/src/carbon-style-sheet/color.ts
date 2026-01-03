import {
	Color,
	type ColorToken,
} from "@audira/carbon-react-native-elements"

export const color =
	Object
		.keys(Color.Token.gray_10)
		.reduce<Record<ColorToken, ColorToken>>((acc, key) => {
			acc[key as ColorToken] = key as ColorToken
			return acc
		}, {
		} as Record<ColorToken, ColorToken>)
