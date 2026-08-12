import * as ManagerApi from "storybook/manager-api"
import * as Theming from "storybook/theming"

ManagerApi.addons.setConfig({
	theme: {
		...Theming.themes.light,
		brandTitle: "@audira/carbon-react-native",
		fontBase: `"IBMPlexSans-Regular", system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`,
		barBg: "#161616",
		barTextColor: "#ffffff",
	},
})
