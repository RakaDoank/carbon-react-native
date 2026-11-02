#!/usr/bin/env bun

import * as node_childProcess from "node:child_process"
import * as node_path from "node:path"

import SemverPrerelease from "semver/functions/prerelease.js"

const
	root =
		node_path.join(import.meta.dirname, "..")

publishPackage("carbon-react-native-elements")
publishPackage("carbon-react-native")

function packPackage(
	data: {
		path: string,
		name: string,
		version: string,
	},
): string {

	node_childProcess.execSync(
		"bun pm pack",
		{
			cwd: data.path,
			stdio: "inherit",
		},
	)

	return data.name.replace("@audira/", "audira-")
		+ `-${data.version}`
		+ ".tgz"

}

function publishPackage(
	name:
		| "carbon-react-native"
		| "carbon-react-native-elements",
) {

	const
		packagePath =
			node_path.join(root, "packages", name),

		packageJson =
			require(`../packages/${name}/package.json`) as typeof import("../packages/carbon-react-native/package.json"),

		tarballFilename =
			packPackage({
				path: packagePath,
				name: packageJson.name,
				version: packageJson.version,
			})

	let publishCommand =
		"npm publish"
			+ ` ./${tarballFilename}`
			+ " --access public"
			+ " --dry-run"

	const prereleaseTag = SemverPrerelease(packageJson.version)
	if(typeof prereleaseTag?.[0] == "string") {
		publishCommand += ` --tag ${prereleaseTag[0]}`
	}

	node_childProcess.execSync(
		publishCommand,
		{
			cwd: packagePath,
			stdio: "inherit",
		},
	)

}
