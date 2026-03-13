const targetPath = "../../packages/carbon-react-native-elements"

module.exports = {
	source: `${targetPath}/src`,
	output: `${targetPath}/lib`,
	targets: [
		[
			"commonjs",
			{
				"esm": true,
			},
		],
		[
			"module",
			{
				"esm": true,
			},
		],
		[
			"typescript",
			{
				project: `${targetPath}/tsconfig.json`,
				tsc: "../../node_modules/typescript/bin/tsc",
			},
		],
	],
}
