import type {
	ExpoConfig,
} from "@expo/config"

const
	packageName =
		"com.audira.lib.carbonreactnative.storybook",

	versionCode =
		1,

	versionName =
		"1.0.0"

export default {

	name: "Carbon React Native",
	slug: "carbonreactnativestorybook",
	scheme: "carbonreactnativestorybook",
	version: versionName,

	orientation: "default",

	userInterfaceStyle: "automatic",

	platforms: [
		"android",
		"ios",
		"web",
	],

	android: {
		versionCode: versionCode,
		adaptiveIcon: {
			backgroundColor: "#ffffff",
			foregroundImage: "./assets/images/android-icon-foreground.png",
			backgroundImage: "./assets/images/android-icon-background.png",
			monochromeImage: "./assets/images/android-icon-monochrome.png",
		},
		package: packageName,
	},

	ios: {
		buildNumber: versionCode.toString(),
		supportsTablet: true,
		bundleIdentifier: packageName,
		icon: "./assets/images/android-icon-foreground.png",
		config: {
			usesNonExemptEncryption: false,
		},
	},

	web: {
		output: "single",
		favicon: "./assets/images/favicon.png",
	},

	plugins: [
		[
			"expo-font",
			{
				fonts: [
					"../assets/fonts/IBMPlexSans-Thin.ttf",
					"../assets/fonts/IBMPlexSans-Thin-Italic.ttf",
					"../assets/fonts/IBMPlexSans-ExtraLight.ttf",
					"../assets/fonts/IBMPlexSans-ExtraLight-Italic.ttf",
					"../assets/fonts/IBMPlexSans-Light.ttf",
					"../assets/fonts/IBMPlexSans-Light-Italic.ttf",
					"../assets/fonts/IBMPlexSans-Regular.ttf",
					"../assets/fonts/IBMPlexSans-Italic.ttf",
					"../assets/fonts/IBMPlexSans-Medium.ttf",
					"../assets/fonts/IBMPlexSans-Medium-Italic.ttf",
					"../assets/fonts/IBMPlexSans-SemiBold.ttf",
					"../assets/fonts/IBMPlexSans-SemiBold-Italic.ttf",
					"../assets/fonts/IBMPlexSans-Bold.ttf",
					"../assets/fonts/IBMPlexSans-Bold-Italic.ttf",
				],
			},
		],
		[
			"expo-splash-screen",
			{
				image: "./assets/images/splash-icon.png",
				imageWidth: 200,
				resizeMode: "contain",
				backgroundColor: "#ffffff",
				dark: {
					backgroundColor: "#ffffff",
				},
			},
		],
	],

	experiments: {
		autolinkingModuleResolution: true,
		reactCompiler: false,
	},

} satisfies ExpoConfig
