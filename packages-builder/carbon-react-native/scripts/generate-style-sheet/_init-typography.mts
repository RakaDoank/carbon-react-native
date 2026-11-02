import {
	Typography,
} from "@audira/carbon-react-native-elements"

import {
	getDirPath,
} from "./_get-dir-path.mjs"

import {
	getObjectString,
} from "./_get-object-string.mjs"

import {
	getString,
} from "./_get-string.mjs"

import {
	MapFontWeightToFamily,
} from "./_map-font-weight-to-family.mts"

import {
	setStringFile,
} from "./_set-string-file.mts"

const
	filePath =
		getDirPath("typography.ts")

export function initTypography() {
	const str = {
		g: "",
		gObject: "",
	}

	str.g +=
		"\n\n" +
		"import {\n" +
		"\tStyleSheet,\n" +
		"} from \"react-native\"" +
		"\n"

	str.gObject +=
		"\n\n" +
		"import type {\n" +
		"\tTextStyle,\n" +
		"} from \"react-native\"" +
		"\n"

	Object.entries(Typography.TypeSets).forEach(([key, val]) => {
		const name = `text_${key}`

		const attrs = Object.entries(val).map(([attrName, attrVal]) => {
			if(attrName == "fontWeight" && typeof attrVal == "number") {
				// To support cross platforms, we are mapping the `fontFamily` value to its PostScript name, instead of `fontWeight` number with single font family name like in Web with `font-weight`.
				// Giving a `fontWeight` number will not work.
				// @see https://docs.expo.dev/develop/user-interface/fonts/#how-to-determine-which-font-family-name-to-use
				return {
					name: "fontFamily",
					value: MapFontWeightToFamily[attrVal]!,
				}
			}
			return {
				name: attrName,
				value: attrVal as number | string,
			}
		})

		str.g += getString({
			name,
			attrs,
		})
		str.gObject += getObjectString(
			{
				name,
				attrs,
			},
			"TextStyle",
		)

		setStringFile({
			g: {
				filePath: filePath.g,
				value: str.g,
			},
			gObject: {
				filePath: filePath.gObject,
				value: str.gObject,
			},
		})
	})
}
