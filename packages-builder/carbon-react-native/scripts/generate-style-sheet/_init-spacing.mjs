import {
	Spacing,
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
	setStringFile,
} from "./_set-string-file.mjs"

const
	filePath =
		getDirPath("spacing.ts")

export function initSpacing() {
	try {
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
			"\tViewStyle,\n" +
			"} from \"react-native\"" +
			"\n"

		Object.entries({ ...Spacing, spacing_00: 0 }).map(([key, value]) => {
			const token = key.replace("spacing_", "")

			// +++ Margin & Padding StyleSheet +++
			str.g += getStringMarginOrPadding({
				type: "margin",
				token,
				value,
			})
			str.g += getStringMarginOrPadding({
				type: "padding",
				token,
				value,
			})
			// --- Margin & Padding StyleSheet ---

			// +++ Margin & Padding Object +++
			str.gObject += getObjectStringMarginOrPadding({
				type: "margin",
				token,
				value,
			})
			str.gObject += getObjectStringMarginOrPadding({
				type: "padding",
				token,
				value,
			})
			// --- Margin & Padding Object ---

			// +++ Gap StyleSheet +++
			str.g += getString({
				name: `gap_${token}`,
				attrs: [{
					name: "gap",
					value,
				}],
			})
			str.g += getString({
				name: `gap_x_${token}`,
				attrs: [{
					name: "columnGap",
					value,
				}],
			})
			str.g += getString({
				name: `gap_y_${token}`,
				attrs: [{
					name: "rowGap",
					value,
				}],
			})
			// --- Gap StyleSheet ---

			// +++ Gap Object +++
			str.gObject += getObjectString(
				{
					name: `gap_${token}`,
					attrs: [{
						name: "gap",
						value,
					}],
				},
				"ViewStyle",
			)
			str.gObject += getObjectString(
				{
					name: `gap_x_${token}`,
					attrs: [{
						name: "columnGap",
						value,
					}],
				},
				"ViewStyle",
			)
			str.gObject += getObjectString(
				{
					name: `gap_y_${token}`,
					attrs: [{
						name: "rowGap",
						value,
					}],
				},
				"ViewStyle",
			)
			// --- Gap Object ---
		})

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
	} catch(err) {
		throw new Error(`/packages-builder/carbon-react-native/scripts/generate-style-sheet/_init-spacing.mjs :: `, err?.message || "Unknown Error")
	}
}

/**
 * @type {([string, string])[]}
 */
const postfixes = [
	["", ""],
	["Horizontal", "x"],
	["Vertical", "y"],
	["Start", "s"],
	["End", "e"],
	["Top", "t"],
	["Right", "r"],
	["Bottom", "b"],
	["Left", "l"],
]

/**
 * @param {{
 * 	type: "margin" | "padding",
 * 	token: string,
 * 	value: number | string
 * }} data
 */
function getStringMarginOrPadding(
	data,
) {
	let str = ""

	postfixes.forEach(postfix => {
		str += getString({
			name: `${mapPrefixToken[data.type]}${postfix[1]}_${data.token}`,
			attrs: [{
				name: `${data.type}${postfix[0]}`,
				value: data.value,
			}],
		})
	})

	return str
}

/**
 * @param {{
 * 	type: "margin" | "padding",
 * 	token: string,
 * 	value: number | string
 * }} data
 */
function getObjectStringMarginOrPadding(
	data,
) {
	let str = ""

	postfixes.forEach(postfix => {
		str += getObjectString(
			{
				name: `${mapPrefixToken[data.type]}${postfix[1]}_${data.token}`,
				attrs: [{
					name: `${data.type}${postfix[0]}`,
					value: data.value,
				}],
			},
			"ViewStyle",
		)
	})

	return str
}

/**
 * @type {Record<Parameters<typeof getObjectStringMarginOrPadding>[0]["type"], string>}
 */
const mapPrefixToken = {
	margin: "m",
	padding: "p",
}
