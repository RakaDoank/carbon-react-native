#!/usr/bin/env bun

import node_fs from "node:fs"
import node_path from "node:path"

import * as Gray10 from "@audira/carbon-react-native-elements/color/token/gray-10"
import * as Gray100 from "@audira/carbon-react-native-elements/color/token/gray-100"

const
	root =
		node_path.resolve(import.meta.dirname, "..")

const
	colorTokenTypes =
		node_fs
			.readFileSync(
				node_path.join(root, "packages/carbon-react-native-elements/src/types/ColorToken.ts"),
				{
					encoding: "utf8",
				},
			)
			.toString()

colorTokenTypes.match(/['"](.*?)['"]/g)?.forEach(text => {
	const token = text.replace(/['"]/g, "")

	// @ts-expect-error check all tokens
	if(!Gray10.all[token]) {
		throw new Error(`Token '${token}' was not found in gray_10`)
	}

	// @ts-expect-error check all tokens
	if(!Gray100.all[token]) {
		throw new Error(`Token '${token}' was not found in gray_100`)
	}
})

console.info("/scripts/validate-color-token :: Color Token has been validated ✓")
