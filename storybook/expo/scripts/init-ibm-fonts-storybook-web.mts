#!/usr/bin/env bun

import * as node_childProcess from "node:child_process"
import * as node_fs from "node:fs"
import * as node_path from "node:path"

const
	root =
		node_path.join(import.meta.dirname, "..", "..", ".."),

	fontsDir =
		node_path.join(root, "assets", "fonts"),

	storybookFontsDir =
		node_path.join(root, "storybook", "expo", "public", "fonts")

if(!node_fs.existsSync(fontsDir)) {
	throw new Error("/assets/fonts directory was not found")
}

if(node_fs.existsSync(storybookFontsDir)) {
	node_fs.rmSync(storybookFontsDir, { recursive: true })
}

node_fs.mkdirSync(storybookFontsDir, { recursive: true })

node_fs.readdirSync(fontsDir).forEach(filePath => {
	const fontSrcFile = node_path.join(fontsDir, filePath)

	if(node_fs.lstatSync(fontSrcFile).isFile()) {
		node_childProcess.execSync(
			`bunx ttf2woff ${fontSrcFile} ${node_path.join(storybookFontsDir, filePath.replace(/.ttf$/, ".woff"))}`,
			{
				cwd: root,
			},
		)
	}
})

console.info("IBM Fonts has been initialized to Storybook (React Native for Web)")
