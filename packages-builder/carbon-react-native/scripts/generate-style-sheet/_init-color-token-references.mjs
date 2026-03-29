import node_fs from "node:fs"
import node_path from "node:path"

import {
	Color,
} from "@audira/carbon-react-native-elements"

import {
	WorkspacePath,
} from "./_workspace-path.mjs"

/**
 * This is not quick styles for color, like `bg_red_100`, `text_black`, etc.
 * This is a color key detection for the `CarbonStyleSheet.color`
 * 
 * The `CarbonStyleSheet.color` will has all the color code in a token (gray_10, gray_100) in a single string that separated with |.
 * 
 * For instance, `CarbonStyleSheet.color.background` will has
 * `#f4f4f4|#000000`. It's formatted in `gray_10|gray_100` and these colors are evaluated at build time.
 * 
 * The motive is really to optimize by not importing all the color tokens in runtime
 */
export function initColorTokenReferences() {
	try {
		let str = ""

		str +=
			`// Generated\n// ${new Date().toUTCString()}`

		str += "\n"

		Object.entries(Color.Token.gray_10).forEach(([tokenName, gray10]) => {
			if(tokenName != "all") {
				// eslint-disable-next-line import-x/namespace
				const gray100 = Color.Token.gray_100[tokenName]

				str +=
					"\n" +
					`export const ${tokenName} = "${gray10}|${gray100}"`
			}
		})

		str += "\n"

		node_fs.writeFileSync(
			node_path.join(
				WorkspacePath,
				"packages",
				"carbon-react-native",
				"src",
				"carbon-style-sheet",
				"color.ts",
			),
			str,
			"utf8",
		)
	} catch(err) {
		throw new Error(`/packages-builder/carbon-react-native/scripts/generate-style-sheet/_init-color-token-references.mjs :: `, err?.message || "Unknown Error")
	}
}
