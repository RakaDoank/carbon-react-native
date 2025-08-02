const
	node_path =
		require('node:path'),

	{
		getDefaultConfig,
		mergeConfig,
	} =
		require('@react-native/metro-config'),

	withStoryBook =
		require('@storybook/react-native/metro/withStorybook'),

	defaultConfig =
		getDefaultConfig(__dirname),

	root =
		node_path.join(__dirname, '..')

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {

	projectRoot: __dirname,

	resolver: {
		extraNodeModules: {
			'@audira/carbon-react-native': node_path.join(root, 'packages/carbon-react-native/src'),
			'@audira/carbon-react-native-elements': node_path.join(root, 'packages/carbon-react-native-elements/src'),
		},
		nodeModulesPaths: [
			node_path.join(root, 'storybook/node_modules'),
			node_path.join(root, 'node_modules'),
		],
	},

	watchFolders: [
		root,
	],

}

module.exports = withStoryBook(
	mergeConfig(defaultConfig, config),
	{
		enabled: true,
		configPath: node_path.join(__dirname, './.storybook-rn'),
	},
)
