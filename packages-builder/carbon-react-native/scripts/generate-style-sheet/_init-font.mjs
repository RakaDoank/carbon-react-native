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
} from "./_map-font-weight-to-family.mjs"

import {
	setStringFile,
} from "./_set-string-file.mjs"

const
	filePath =
		getDirPath("font.ts")

export function initFont() {
	try {
		const str = {
			g: "",
			gObject: "",
		}

		const comment =
			"// To support cross platforms, we are mapping the `fontFamily` value to its PostScript name,\n" +
			"// instead of the `fontWeight` number with a single font family name like in Web" +
			"// Giving a `fontWeight` number will not work.\n" +
			"// @see https://docs.expo.dev/develop/user-interface/fonts/#how-to-determine-which-font-family-name-to-use"

		str.g +=
			"\n\n" +
			comment + "\n\n" +
			"import {\n" +
			"\tStyleSheet,\n" +
			"} from \"react-native\"" +
			"\n"

		str.gObject +=
			"\n\n" +
			comment + "\n\n" +
			"import type {\n" +
			"\tTextStyle,\n" +
			"} from \"react-native\"" +
			"\n"

		Object.values(MapFontWeightToFamily).forEach(val => {
			const name = `font_${val.replace("IBMPlexSans-", "").toLowerCase()}`
			const nameItalic = `${name.replace("_regular", "")}_italic`

			str.g += getString({
				name,
				attrs: [{
					name: "fontFamily",
					value: val,
				}],
			})
			str.g += getString({
				name: nameItalic,
				attrs: [{
					name: "fontFamily",
					value: `${val.replace("-Regular", "")}-Italic`,
				}],
			})

			str.gObject += getObjectString(
				{
					name,
					attrs: [{
						name: "fontFamily",
						value: val,
					}],
				},
				"TextStyle",
			)
			str.gObject += getObjectString(
				{
					name: nameItalic,
					attrs: [{
						name: "fontFamily",
						value: `${val.replace("-Regular", "")}-Italic`,
					}],
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
	} catch(err) {
		throw new Error(`/packages-builder/carbon-react-native/scripts/generate-style-sheet/_init-typography.mjs :: `, err?.message || "Unknown Error")
	}
}
