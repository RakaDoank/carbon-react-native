const
	node_path =
		require('node:path')

const
	workspaceRoot =
		node_path.join(__dirname, '..')

module.exports = {

	assets: [
		node_path.join(workspaceRoot, 'assets/fonts'),
	],

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
