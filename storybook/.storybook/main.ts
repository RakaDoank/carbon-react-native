import node_path from 'node:path'

import type {
	StorybookConfig,
} from '@storybook/react-native-web-vite'

const workspaceRoot = node_path.join(__dirname, '../..')

export default {

	staticDirs: ['../public'],

	stories: [
		"../stories-web/**/*.mdx",
		"../stories-web/**/*.stories.@(js|jsx|mjs|ts|tsx)",
	],

	addons: [
		"@storybook/addon-docs",
	],

	framework: {
		name: "@storybook/react-native-web-vite",
		options: {
			pluginReactOptions: {
				babel: {
					plugins: [
						'react-native-reanimated/plugin',
					],
				},
			},
		},
	},

	viteFinal(config) {
		config.resolve = {
			...config.resolve ?? {},
			alias: {
				...config.resolve?.alias ?? {},
				'@audira/carbon-react-native': node_path.join(workspaceRoot, 'packages/carbon-react-native/src'),
				'@audira/carbon-react-native-elements': node_path.join(workspaceRoot, 'packages/carbon-react-native-elements/src'),
			},
		}

		return config
	},

} satisfies StorybookConfig
