const
	node_path =
		require("node:path"),

	{
		withStorybook,
	} =
		require("@storybook/react-native/metro/withStorybook"),

	{
		mergeConfig,
	} =
		require("@expo/metro/metro-config"),

	{
		getDefaultConfig,
	} =
		require("expo/metro-config"),

	defaultConfig =
		getDefaultConfig(__dirname),

	root =
		node_path.join(__dirname, "..")

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import("@react-native/metro-config").MetroConfig}
 */
const config = {

	projectRoot: __dirname,

	resolver: {
		assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== "svg"),
		extraNodeModules: {
			"@audira/carbon-react-native": node_path.join(root, "packages/carbon-react-native/src"),
			"@audira/carbon-react-native-elements": node_path.join(root, "packages/carbon-react-native-elements/src"),
		},
		nodeModulesPaths: [
			node_path.join(root, "storybook/node_modules"),
			node_path.join(root, "node_modules"),
		],
		sourceExts: [
			...defaultConfig.resolver.sourceExts ?? [],
			"svg",
		],
	},

	transformer: {
		babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
	},

}

module.exports = withStorybook(
	mergeConfig(defaultConfig, config),
	{
		enabled: true,
		configPath: node_path.join(__dirname, "./.storybook-rn"),
	},
)
