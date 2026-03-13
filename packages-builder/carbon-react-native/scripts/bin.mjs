#!/usr/bin/env node

import node_childProcess from "node:child_process"
import node_fs from "node:fs"
import node_path from "node:path"

import {
	prepack,
} from "./_prepack.mjs"

import {
	generateStyleSheet,
} from "./generate-style-sheet/index.mjs"

const
	workspacePath =
		node_path.join(import.meta.dirname, "..", "..", ".."),

	packagePath =
		node_path.join(workspacePath, "packages", "carbon-react-native"),

	builderBobPath =
		node_path.join(import.meta.dirname, "..")

try {

	prepack()
	generateStyleSheet()

	const libPath = node_path.join(packagePath, "lib")

	if(node_fs.existsSync(libPath)) {
		node_fs.rmSync(
			libPath,
			{
				recursive: true,
				force: true,
			},
		)
	}

	node_childProcess.execSync(
		"npx bob build",
		{
			cwd: builderBobPath,
			stdio: "inherit",
		},
	)

} catch(err) {

	throw new Error(`/packages-builder/carbon-react-native/scripts/bin.mjs :: ${err instanceof Error ? `[${err.name}] :: ${err.message}` : "Unknown error"}`)

}
