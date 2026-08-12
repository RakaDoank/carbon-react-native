const linkAssets = require("@react-native-community/cli-link-assets");

/**
 * @type import("@react-native-community/cli-types").Config
 */
const config = {
	assets: [
		"../../assets/fonts",
	],
	commands: [
		linkAssets.commands.linkAssets,
	],
	project: {
		macos: {
			assets: [
				"../../assets/fonts",
			],
		},
	},
}

module.exports = config
