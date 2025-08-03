const
	node_path =
		require('node:path'),

	packageJson =
		require('./package.json')

const
	workspaceRoot =
		node_path.join(__dirname, '..'),

	repositoryNodeModules =
		node_path.join(workspaceRoot, 'node_modules'),

	rnDependencies =
		Object.keys(packageJson.dependencies),

	ignoreRnDeps =
		[
			'react',
			'react-native',
		]

module.exports = {

	assets: [
		node_path.join(workspaceRoot, 'assets/fonts'),
	],

	/**
	 * Since this repository is a monorepo setup with hoisted node_modules
	 * We have to manually put the React Native libraries to the correct node_modules path
	 */
	dependencies: Object.assign(
		{
			// Put your other dependencies to be linked
		},
		rnDependencies.reduce((
			/**
			 * @type {Record<string, string>}
			 */
			acc,
			dependency,
		) => {
			if(ignoreRnDeps.indexOf(dependency) == -1) {
				acc[dependency] = {
					root: node_path.join(repositoryNodeModules, dependency),
				}
			}
			return acc
		}, {}),
	),

	project: {
		ios: {
			/**
			 * Intentionally `false`.
			 * Do the pod installation manually, and ensure you are not using Ruby version of macOS default
			 * 
			 * To install, run this command
			 * ```bash
			 * bundle install && bundle exec pod install
			 * ```
			 */
			automaticPodsInstallation: false,
		},
		android: {},
	},

}
