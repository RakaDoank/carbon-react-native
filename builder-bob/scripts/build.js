const
	node_childProcess =
		require("node:child_process"),

	node_fs =
		require("node:fs"),

	node_path =
		require("node:path"),

	node_process =
		require("node:process")

const
	root =
		node_path.resolve(__dirname, "..", ".."),

	builderBobPath =
		node_path.join(root, "builder-bob"),

	packages =
		{
			"carbon-react-native": node_path.join(root, "packages/carbon-react-native"),
			"carbon-react-native-elements": node_path.join(root, "packages/carbon-react-native-elements"),
		}

try {
	const pkg = node_process.argv[2]

	if(!pkg) {
		throw new Error("Unspecified package")
	}

	if(!packages[pkg]) {
		throw new Error(`Only one of these packages is allowed \n- ${Object.keys(packages).toString().replace(/,/g, "\n- ")}`)
	}

	node_fs.copyFileSync(
		node_path.join(builderBobPath, `configs/${pkg}/bob.config.js`),
		node_path.join(builderBobPath, "bob.config.js"),
	)

	const libPath = node_path.join(packages[pkg], "lib")

	if(node_fs.existsSync(libPath)) {
		node_fs.rmSync(
			node_path.join(packages[pkg], "lib"),
			{
				recursive: true,
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
	throw new Error(`/builder-bob/scripts/build.js :: ${err instanceof Error ? `[${err.name}] ${err.message}` : "Unknown error"}`)
}
