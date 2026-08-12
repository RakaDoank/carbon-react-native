const
	node_path =
		require("node:path"),

	{
		withStorybook,
	} =
		require("@storybook/react-native/metro/withStorybook"),

	{ makeMetroConfig } =
		require("@rnx-kit/metro-config"),

	/**
	 * @type {import("@rnx-kit/metro-resolver-symlinks")["default"]}
	 */
	MetroSymlinksResolver =
		require("@rnx-kit/metro-resolver-symlinks")

const
	workspaceRoot =
		node_path.join(__dirname, "..", ".."),

	rnxKitMetroConfig =
		makeMetroConfig()

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {

	...rnxKitMetroConfig,

	projectRoot: __dirname,

	resolver: {
		...rnxKitMetroConfig.resolver,
		assetExts: [
			...(rnxKitMetroConfig.resolver?.assetExts?.filter(ext => ext !== "svg") ?? []),
		],
		nodeModulesPaths: [
			node_path.join(__dirname, "node_modules"),
			node_path.join(workspaceRoot, "node_modules"),
		],
		resolveRequest: MetroSymlinksResolver(),
		sourceExts: [
			...(rnxKitMetroConfig.resolver?.sourceExts ?? []),
			"svg",
		],
	},

	transformer: {
		...rnxKitMetroConfig.transformer,
		babelTransformerPath: require.resolve("react-native-svg-transformer/react-native"),
	},

	watchFolders: [
		workspaceRoot,
	],

}

module.exports = withStorybook(
	config,
	{
		enabled: true,
		configPath: node_path.join(__dirname, "./node_modules/@carbon-storybook/app/.storybook-rn"),
	},
)
