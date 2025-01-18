const
	node_path =
		require('node:path'),

	{
		getDefaultConfig,
		mergeConfig,
	} =
		require('@react-native/metro-config')

const
	projectRoot =
		__dirname,

	workspaceRoot =
		node_path.resolve(projectRoot, '..')

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {

	resolver: {
		disableHierarchicalLookup: true,
		nodeModulesPaths: [
			node_path.join(projectRoot, 'node_modules'),
			node_path.join(workspaceRoot, 'node_modules'),
		],
	},

	watchFolders: [
		workspaceRoot,
	],

};

module.exports = mergeConfig(
	getDefaultConfig(projectRoot),
	config,
);
