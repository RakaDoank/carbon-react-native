import node_path from "node:path"

import type {
	StorybookConfig,
} from "@storybook/react-native-web-vite"

import VitePluginSVGR from "vite-plugin-svgr"

const workspaceRoot = node_path.join(import.meta.dirname, "..", "..")

const main: StorybookConfig = {

	staticDirs: ["../public"],

	stories: [
		"../stories/**/*.mdx",
		"../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
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
						"@babel/plugin-transform-export-namespace-from",
					],
				},
			},
		},
	},

	viteFinal(config) {
		config.resolve = {
			...config.resolve ?? {
			},
			alias: {
				...config.resolve?.alias ?? {
				},
				"@audira/carbon-react-native": node_path.join(workspaceRoot, "packages", "carbon-react-native", "src"),
				"@audira/carbon-react-native-elements": node_path.join(workspaceRoot, "packages", "carbon-react-native-elements", "src"),
			},
		}

		config.plugins = [
			...config.plugins ?? [],
			VitePluginSVGR({
				include: [
					/\.svg$/,
				],
				svgrOptions: {
					native: true,
					exportType: "default",
					svgoConfig: {
						plugins: [{
							name: "preset-default",
							params: {
								overrides: {
									convertColors: false,
									inlineStyles: {
										onlyMatchedOnce: false,
									},
									removeUnknownsAndDefaults: false,
									removeViewBox: false, // By default it's removed. Keep the viewBox in svg.
								},
							},
						}],
					},
				},
			}),
		]

		return config
	},

}

export default main
